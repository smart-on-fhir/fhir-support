# EHR FHIR Support
### Website to view the current FHIR support in commercial EHR systems (based on the conformance statements published in online sandbox environments and user supplied notes).

---

### [Visit the Site!](http://docs.smarthealthit.org/fhir-support)

---

## Errors
If you spot an error in the website, please contact the EHR vendor to update their conformance statement. You can also open a pull request (or create a github issue on this project) to add a new note to the ```config.json``` file that will show up on the website.

## Tech
The project is built with a lightweight web app framework called [HyperApp](https://github.com/hyperapp/hyperapp). It requires NodeJs to compile, however, the resulting files can be run on any web server. It's currently under active development - code is rough, there are bugs and features may change or be removed!

To install a local copy:
1. Install NodeJs from https://nodejs.org

2. Clone this repository
    
    ```
    git clone https://github.com/smart-on-fhir/fhir-support
    cd fhir-support
    ```
    
3. Install the dependencies
    
    ```
    npm install
    ```
    
4. Run the dev server

    ```
    npm start
    ```
    
5. Browse to ```http://localhost:8080```

6. Optionally build a deployable package (the entire ```public``` directory should be deployed):

    ```
    npm run build
    ```

## About
To stay updated on the project follow [@gotdan](https://twitter.com/intent/user?screen_name=gotdan) and [@smarthealthit](https://twitter.com/intent/user?screen_name=smarthealthit) on twitter!
