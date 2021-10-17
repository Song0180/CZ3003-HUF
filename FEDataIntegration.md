# Frontend Data Integration

The overall flow of data integration is

1. Add API functions that will be used to call the backend APIs. API functions should be put in `frontend/src/services/api`

   > Note that we try to categorize the API functions for better maintainability.
   > API functions should be put in the corresponding folder.  
   > E.g., if this api is game related, it should be put in `frontend/src/services/api/game/index.js`  
   > Create a new folder and index.js if they do not already exist.

   Sample code of fetch games in `frontend/src/services/api/game/index.js`:

   ```JavaScript
   // add this import statement before you write api functions if it is not added
   import yelp from '../../yelp';

   // api function to call 'localhost:8000/hufgames'
   export const fetchGames = async () => {
     try {
       const response = await yelp.get('/hufgames', {});
       return response;
     } catch (err) {
       return err.message;
     }
   };
   ```

2. Add states and functions that updates the state in the corresponding data store

   > Create a new data store if it is not created yet
