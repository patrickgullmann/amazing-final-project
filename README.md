## Overview

<img src="/client/public/images/demo.png">

Biketastic allows users to mark new and rate existing dangerous locations for cyclists. The web app integrates Weather APIs and Mapxbox.

## Features

### Basic Map Functions

-   Users can use the search bar on the top left corner to nagivate to any city. The current city can also be focused by a current location button on the top right corner.
-   This app uses Mapbox' core features to also zoom in and out. 

### Adding New Pins

-   For marking new dangerous locations, users can click on any point on the map to add a new pin.
-   By clicking, the app opens the uploader component, where the user can add name, title, and description as well as might upload a picture.
-   Upon completion of upload, a new pin gets added to the map.

### Inspecting Existing Pins 

-   Clicking on a pin brings up the Pin Component (Modal), where users can see the added information of the pin as well as current weather data of the location.
-   The current weather data is presented by fetchgin Stormglass.io weather API.

### Rating Places 

-   A button in the Pin Component allows users to increase the awareness/dangerousness of the location.
-   If enough users rated a pin/location as dangerous, the pin changes the color to red or even dark-red.
