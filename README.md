# Bestillingsapp
## For non-technical users

This app is a simple planning and task list you can use without any technical knowledge. It runs in your web browser and saves your work automatically.

How to use (simple steps)
1. Open the app in your browser (double-click `index.html` or use the local server link if provided).
2. Add a new task by clicking the + button or using the empty row in the list.
3. Edit fields directly in the list: task name, responsible person, deadline, hours and comments.
4. Use the filter buttons to show only selected items, overdue tasks, or tasks in progress.
5. Switch between views with the tabs at the top (List, Board, Dashboard, Week Plan, Holiday).
6. Export the current view as CSV using the **Eksporter CSV** button.
7. To clear all data, click **Nullstill** — this will erase local data in your browser.

Sharing and syncing
- If your team wants to share data between different copies, open the **Delt lagring** modal.
- Enter the Bin ID and the JSONBin API Key (your administrator can provide these). The API Key is only stored for your current browser session and must be re-entered if you close the tab.
- Once connected, changes are automatically synced in the background.
- If you prefer not to share, you can simply use the app locally: nothing is sent anywhere and all data is kept in your browser.

Privacy and safety
- Your data is stored in your browser by default. If you choose to sync, the JSONBin service will hold a copy — only provide API keys to trusted people.
- The app does not require any installation; it works from the files in this repository or from a static web host.


## For technical users

A static task and planning app built with `index.html`, `styles.css`, and `app.js`.

## How to run locally
1. Open `index.html` in your browser.

## How to use

- The interface is loaded from `index.html`.
- The app saves local data automatically in the browser.
- Open the shared storage modal by clicking **Delt lagring**.

## JSONBin sync

The app can sync with a JSONBin bin using:
- JSONBin **Bin ID**
- JSONBin **API Key**

### Setup
1. Create a bin on https://jsonbin.io and save an empty object (`{}`) if needed.
2. Enter the `Bin ID` and `API Key` in the shared storage modal.
3. Click **Koble til**.

### Notes
- The API key is stored only for the current browser session.
- If you refresh the page while the session is active, the app reconnects.
- Closing the browser tab or starting a new session requires re-entering the API key.

## Files

- `index.html` — application shell and UI
- `styles.css` — presentation styles
- `app.js` — application logic and JSONBin sync
