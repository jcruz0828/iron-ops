#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p assets/fonts

# Download Montserrat fonts
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Regular.ttf" -o assets/fonts/Montserrat-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Bold.ttf" -o assets/fonts/Montserrat-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Medium.ttf" -o assets/fonts/Montserrat-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/montserrat/static/Montserrat-Light.ttf" -o assets/fonts/Montserrat-Light.ttf

# Download Roboto fonts
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Regular.ttf" -o assets/fonts/Roboto-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Bold.ttf" -o assets/fonts/Roboto-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Medium.ttf" -o assets/fonts/Roboto-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Light.ttf" -o assets/fonts/Roboto-Light.ttf

# Download Inter fonts
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Regular.ttf" -o assets/fonts/Inter-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Bold.ttf" -o assets/fonts/Inter-Bold.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Medium.ttf" -o assets/fonts/Inter-Medium.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Light.ttf" -o assets/fonts/Inter-Light.ttf

# Download Space Mono fonts
curl -L "https://github.com/google/fonts/raw/main/apache/spacemono/SpaceMono-Regular.ttf" -o assets/fonts/SpaceMono-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/apache/spacemono/SpaceMono-Bold.ttf" -o assets/fonts/SpaceMono-Bold.ttf

echo "Fonts downloaded successfully!" 