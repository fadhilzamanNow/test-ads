# Technical Test ADS

## You may go visit this drive to check the screenshot
[SCREENSHOT TAMPILAN HALAMAN](https://drive.google.com/drive/folders/1aZEiA0KZkhIOt78lVq7c4OLOE_dUVzhc?usp=sharing)

## Front End Stack
- React
- Vite
- Tanstack Router
- Tanstack Query
- Zustand
- Shadcn
- TailwindCSS


## To run this project, you may 
### run directly to the deployed project on vercel
- navigate to this link [https://fadhil-test-ads.vercel.app](https://fadhil-test-ads.vercel.app)
- since the backend is still http, while the fronend is https. The browser block this mixed content, so you need to disabled this security
- if you are on chrome, navigate to this link [chrome://settings/content/siteDetails?site=https%3A%2F%2Ffadhil-test-ads.vercel.app](chrome://settings/content/siteDetails?site=https%3A%2F%2Ffadhil-test-ads.vercel.app) and change the insecure content value into true
- if you are on firefox, navigate to this link [about:config](about:config), and change the security.mixed_content.block_active_content value into false

### run locally
- Run Locally ( clone this repo )
- navigate to the repo folder
- run `npm install`
- create .env folder and paste this `VITE_BACKEND_URL=http://93.127.185.148:8888/api/v1` then save
- move to your terminal in the same directory and run `npm run dev` for (dev bundle) or `npm run build` with `npm run preview` for (build bundle)
 
