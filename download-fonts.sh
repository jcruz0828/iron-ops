#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p assets/fonts
cd assets/fonts

# Download Montserrat
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Regular.ttf" -o Montserrat-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Bold.ttf" -o Montserrat-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Medium.ttf" -o Montserrat-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Light.ttf" -o Montserrat-Light.ttf

# Download Roboto
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Regular.ttf" -o Roboto-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Bold.ttf" -o Roboto-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Medium.ttf" -o Roboto-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Light.ttf" -o Roboto-Light.ttf

# Download Inter
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Regular.ttf" -o Inter-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Bold.ttf" -o Inter-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Medium.ttf" -o Inter-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Light.ttf" -o Inter-Light.ttf

# Download Space Mono
curl -L "https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYEF8RXi4EwQ.woff2" -o SpaceMono-Regular.ttf
curl -L "https://fonts.gstatic.com/s/spacemono/v13/i7dMIFZifjKcF5UAWdDRYEB8RXi4EwQ.woff2" -o SpaceMono-Bold.ttf

echo "Fonts downloaded successfully!" 