Param(
    [ArgumentCompleter({
        $(Get-ChildItem -Path ($PSScriptRoot) -Name -Directory)
    })]$config,
    [switch]$write,
    [switch]$unsafe,
    $rest
)

$jsonPath = "$PSScriptRoot/$config/biome.json"

if (!(Test-Path $jsonPath)){
    Write-Error "[ERR]: Can't find 'biome.json' at '$config'"
    exit 1
}



$cmd = "biome check --config-path=$jsonPath "

if ($unsafe){
    $cmd += " --unsafe "
}

if ($write){
    $cmd += " --write "
}

$cmd += $rest

Invoke-Expression $cmd
