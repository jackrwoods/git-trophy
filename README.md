# git-trophy

🏆 Create a 3D Printed Model of Your Github Contributions

## Demo:

[![demo](assets/demo.gif)](https://gittrophy.com)

## Architecture / Design
### Front End
#### Technologies
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [react-semantic-ui](http://react.semantic-ui.com/)
#### Components
- App.js
  - Main element to be rendered. Contains all other elements.
- ExportPanel.js
  - Element that renders the tweet and export to shapeways buttons.
- Information.js
  - This element is used to render the informational text at the bottom of the page.
- Navbar.js
  - Renders the simple navigation bar at the top with the git trophy icon.
- Preview.js
  - Renders the 3D viewer for the model.
- RepoSelector.js
  - Renders the user input form that decides which year and entity to display the trophy for.
- TrophyModel.js
  - This component renders the actual model contained inside of the preview element.
#### Redux Store
##### Description
The reduc store, stores the data used to generate the 3D models. This includes contirbution data, available year data and data on what the current entity and year is.
##### Functions
- **loadContributions**
  - Params:
    - Entity: String (username or organization)
    - Year: Number (year to pull data from)
  - Description:
    - Calls the API for loading contirbutions and populates the store with the returned data. See the API call for a description of what data is pulled.
- **debouncedYearOptionsFetch**
  - Params:
    - Entity: String (username or organization)
  - Description:
    - Calls the years API then calls the load contributions function above to populate the store with a default year. The available years are also put into the store for further selection by the user at a later time.
- **updateSelectedEntity**
  - Params:
    - Entity: String (username or organization)
  - Description:
    - sets the incoming entity to all lowercase and then calls the year fetch function above given the lowercased entity.
- **updateQueryString**
  - Params:
    - Entity: String (username or organization)
    - Year: Number (year to pull data from)
- Description:
  - Sets the browsers URL to reflect the given entity and year
- **updateSelectedYear**
  - Params:
    - Year: Number (year to pull data from)
  - Description:
    - Calls the load contributions function with the newly given year.
- **setSceneContainer**
  - Params:
    - Container: Object
  - Description:
    - sets the scene container to the specified container
- **downloadModel**
  - Params:
    - None
  - Description:
    - Downloads the generated model to the users computer
- **exportModel**
  - Params:
    - None
  - Description:
    - Sends the 3D model to shapeways to use their services for 3D printing.
### Back End
#### Technologies
- [Zappa](https://github.com/Miserlou/Zappa/)
- AWS
#### Routes
| Route: ``` / ``` | Method: ``` GET ``` |
|:-----------------|:--------------------|
| **Description**      | This is a test route used to ensure the health of the API  |
| **Params**   | **None**  |
| **Returns**   | ```PONG```  |

| Route: ``` /v1/contirbutions ``` | Method: ``` GET ``` |
|:---------------------------------|:--------------------|
| **Description**      | This route returns the contirbutions given an organization or contributor and a year  |
| **Params**   | **Entity** - name of organization or person (String) <br> **Year** -  year of contributions (Number) |
| **Returns**   | ``` {entity: String, year: Number,ccontributions: Array }```  |

| Route: ``` /v1/years ``` | Method: ``` GET ``` |
|:-----------------|:--------------------|
| **Description**      | This route returns the years of data that are avaialable given the contributor or organization |
| **Params**   | **Entity** - name of organization or person (String) |
| **Returns**   | ```{ years: Array, entity: String}```  |

### [More Information](http://benjamincongdon.me/blog/2017/08/11/Building-GitTrophy/)
<!-- GitTrophy uses [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [react-three-renderer](https://github.com/toxicFork/react-three-renderer), and [react-semantic-ui](http://react.semantic-ui.com/) on the frontend.

On the backend, GitTrophy has a [Zappa](https://github.com/Miserlou/Zappa/)-powered AWS Lambda API to scrape Github contribution data.

Most information is available on my [blog post](http://benjamincongdon.me/blog/2017/08/11/Building-GitTrophy/) about this project. -->

## Run it yourself

```bash
git clone https://github.com/bcongdon/git-trophy
cd git-trophy

# Start the site
npm i
npm start

# Deploy the lambdas
cd git_trophy_lambda
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
zappa deploy

# Publish the site
cd ..
npm run deploy
```

This repo isn't necessarily meant to be used to create an independent deployment of git-trophy, but there's nothing stopping you if you want to!

**Note**: To deploy the backend/frontend you'll have to setup your [AWS credentials](https://aws.amazon.com/blogs/security/a-new-and-standardized-way-to-manage-credentials-in-the-aws-sdks/)

* Alternatively, you can run the backend locally with `python git_trophy_lambda/app.py`
* You'll also need to...
    * edit the lambda URL in `src/actions.js` (Set `BASE_URL` to the lambda URL)
    * change the S3 deployment bucket in `package.json`
    * change the S3 cache bucket in `git_trophy_lambda/zappa_settings.json`
    * change the Shapeways OAuth clientId in `src/oauth.js`

## Related Projects
* [bpy_lambda](https://github.com/bcongdon/bpy_lambda) - Run [Blender](https://www.blender.org/) in AWS lambda
* [git_lambda](https://github.com/bcongdon/git_lambda) - Run `git` in a Python lambda subprocess

## Attribution

* Thanks to [Aaron Francis](https://twitter.com/aarondfrancis) for his help in getting contribution stats for repositories (and inspiration via [Commit Print](commitprint.com))!

* Trophy Icon from [NounProject](https://thenounproject.com/search/?q=trophy&i=925612)
* Git Icon from [NounProject](https://thenounproject.com/npbluth/collection/git/?oq=git&cidx=0&i=368567)
