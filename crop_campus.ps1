Add-Type -AssemblyName System.Drawing
$sourcePath = Join-Path $PSScriptRoot "reference_images\Figure_15_Login_Interface.png"
if (Test-Path $sourcePath) {
    $bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
    # The image width is 735, height is 329. The left half is 326px wide.
    $rect = New-Object System.Drawing.Rectangle(0, 0, 327, 329)
    $crop = $bmp.Clone($rect, $bmp.PixelFormat)
    $dest = Join-Path $PSScriptRoot "frontend\public\images\campus_bg.png"
    $crop.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    $bmp.Dispose()
    Write-Host "Extracted campus_bg.png successfully!"
} else {
    Write-Host "Source path not found: $sourcePath"
}
