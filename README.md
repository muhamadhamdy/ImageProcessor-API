### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettier: ```npm run prettier```
- Run unit tests: ```npm run test```
- Start server (develoment): ```npm run start```
- Start server (production): ```npm run P_start```

### Usage
The server will listen on port 3111:

#### Brief instructions
http://localhost:3111/

#### Endpoint to resize images
http://localhost:3000/resize

Expected query arguments are:
- _imagename_: Available filenames are:
  - encenadaport.jpg
  - fjord.jpg
  - icelandwaterfall.jpg
  - palmtunnel.jpg
  - santamonica.jpg
- _height_: numerical pixel value > 0
- _width_: numerical pixel value > 0

#### Example 
http://localhost:3111/resize?imagename=palmtunnel.jpg&height=400&width=400
Will scale the palmtunnel.jpg image to 400 by 400 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the original again.

#### Example 2
http://localhost:3111/resize?imagename=palmtunnel.jpg&height=-400&width=400
Values of height and width must be a positive number over 0.

#### Example 3
http://localhost:3111/resize?imagename=palmtunnel&height=-400&width=400
Error resizing image.

#### Example 4
http://localhost:3111/resize
Error reading parameters, please check it again. Calls must be in format 
YOURSERVERNAME/resize?imagename=YOURIMAGENAME.EXT&height=NUMBER&width=NUMBER

### Notes
- You have to include image extention in imagename argument or you will get an error.
- Images are served from `resources/images/full`. for more images you can put into that directory,
  but the filetype is jpg files for now.
  (reading other extentions will be added in further improvements).
- Image thumbs will be stored in `resources/images/thumbnail` and can be deleted from
  there to verify that in that case they will be re-created on subsequent calls
  to the same endpoint.
