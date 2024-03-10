function Rename-MainFiles {
    param (
        [string]$FolderPath
    )

    Write-Host("Renamng files: " + $FolderPath + "...")
    # Get all .js files matching the pattern
    $JsFiles = Get-ChildItem -Path $FolderPath -Filter "main.*.js"

    foreach ($JsFile in $JsFiles) {
        # Build the new filename for .js files
        $NewJsFileName = "$($JsFile.DirectoryName)\main.js"

        # Rename the .js file
        Rename-Item -Path $JsFile.FullName -NewName $NewJsFileName
    }

    # Get all .css files matching the pattern
    $CssFiles = Get-ChildItem -Path $FolderPath -Filter "main.*.css"

    foreach ($CssFile in $CssFiles) {
        # Build the new filename for .css files
        $NewCssFileName = "$($CssFile.DirectoryName)\main.css"

        # Rename the .css file
        Rename-Item -Path $CssFile.FullName -NewName $NewCssFileName
    }
}

# Example usage:
Rename-MainFiles -FolderPath "./build/static/css"
Rename-MainFiles -FolderPath "./build/static/js"
