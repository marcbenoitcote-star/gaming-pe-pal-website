[CmdletBinding()]
param(
    [switch]$Once,
    [ValidateRange(15, 3600)]
    [int]$IntervalSeconds = 30
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Get-RequiredEnvironmentValue {
    param([Parameter(Mandatory = $true)][string]$Name)

    $value = [Environment]::GetEnvironmentVariable($Name)
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "La variable d'environnement $Name est requise."
    }

    return $value
}

function Send-PublicStatus {
    param(
        [Parameter(Mandatory = $true)][hashtable]$Payload,
        [Parameter(Mandatory = $true)][string]$Endpoint,
        [Parameter(Mandatory = $true)][string]$Token
    )

    $headers = @{
        Authorization = "Bearer $Token"
        Accept = "application/json"
    }

    $body = $Payload | ConvertTo-Json -Depth 4 -Compress
    Invoke-RestMethod `
        -Method Post `
        -Uri $Endpoint `
        -Headers $headers `
        -ContentType "application/json; charset=utf-8" `
        -Body $body `
        -TimeoutSec 15 | Out-Null
}

$apiBaseUrl = if ($env:PALWORLD_REST_URL) {
    $env:PALWORLD_REST_URL.TrimEnd("/")
} else {
    "http://127.0.0.1:8212/v1/api"
}
$apiUsername = if ($env:PALWORLD_REST_USERNAME) { $env:PALWORLD_REST_USERNAME } else { "admin" }
$adminPassword = Get-RequiredEnvironmentValue -Name "PALWORLD_ADMIN_PASSWORD"
$statusEndpoint = if ($env:STATUS_ENDPOINT) {
    $env:STATUS_ENDPOINT
} else {
    "https://gaming-pe-pal.com/api/server-status"
}
$statusToken = Get-RequiredEnvironmentValue -Name "STATUS_UPDATE_TOKEN"

$basicAuthSource = "${apiUsername}:${adminPassword}"
$basicAuth = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($basicAuthSource))
$palworldHeaders = @{
    Authorization = "Basic $basicAuth"
    Accept = "application/json"
}

Write-Host "Agent de statut Gaming P&E Pal demarre. Aucun identifiant de joueur ne sera transmis."

do {
    $payload = $null

    try {
        $info = Invoke-RestMethod `
            -Method Get `
            -Uri "$apiBaseUrl/info" `
            -Headers $palworldHeaders `
            -TimeoutSec 10
        $metrics = Invoke-RestMethod `
            -Method Get `
            -Uri "$apiBaseUrl/metrics" `
            -Headers $palworldHeaders `
            -TimeoutSec 10

        $payload = @{
            online = $true
            serverName = [string]$info.servername
            description = [string]$info.description
            version = [string]$info.version
            currentPlayers = [int]$metrics.currentplayernum
            maxPlayers = [int]$metrics.maxplayernum
            serverFps = [double]$metrics.serverfps
            uptimeSeconds = [int64]$metrics.uptime
            worldDay = [int64]$metrics.days
            baseCampCount = [int]$metrics.basecampnum
        }
    } catch {
        Write-Warning "API Palworld indisponible: $($_.Exception.Message)"
        $payload = @{ online = $false }
    }

    try {
        Send-PublicStatus -Payload $payload -Endpoint $statusEndpoint -Token $statusToken
        $state = if ($payload.online) { "EN LIGNE" } else { "HORS LIGNE" }
        Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Statut envoye: $state"
    } catch {
        Write-Warning "Envoi vers le site impossible: $($_.Exception.Message)"
    }

    if (-not $Once) {
        Start-Sleep -Seconds $IntervalSeconds
    }
} while (-not $Once)
