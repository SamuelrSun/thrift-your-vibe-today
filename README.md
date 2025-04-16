# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ffea0bdc-4ceb-47ef-bf9e-bb8bde9a3825

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ffea0bdc-4ceb-47ef-bf9e-bb8bde9a3825) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ffea0bdc-4ceb-47ef-bf9e-bb8bde9a3825) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Editing Product Data & UI Elements

### Banners
To edit or add promotional banners on the search page:
1. Navigate to `src/config/banners.ts`
2. Edit the `banners` array to modify existing banners or add new ones
3. Each banner object supports:
   - Basic info (title, description, contact)
   - Styling (colors, borders)
   - Icons (using lucide-react icons)
   - Countdown timers
   - Custom buttons and links

### Discount Codes
To manage discount codes for the cart:
1. Open `src/config/discounts.ts`
2. Edit the `discountCodes` array to:
   - Add new discount codes
   - Modify discount percentages
   - Set expiration dates
   - Add descriptions

### Product Inventory
To update product listings:
1. Go to `src/components/Search/searchData.ts`
2. Modify the `inventory` array to:
   - Add new products
   - Update existing products
   - Set prices and availability
   - Update images (store images in `/public`)
   - Mark items as sold
   - Add category tags

### Product Visibility
To manage product visibility:
1. Add the `visible` property to products in `src/components/Search/searchData.ts`:
   ```typescript
   {
     title: "New Product",
     brand: "Brand Name",
     // other properties
     visible: false // Set to false to hide from customers but keep in database
   }
   ```
2. To show products with visibility toggle in admin views:
   ```typescript
   <ItemCard 
     item={product} 
     showVisibilityToggle={true} 
     onVisibilityChange={(itemId, visible) => {
       // Handle visibility change
       console.log(`Item ${itemId} visibility set to ${visible}`);
     }}
   />
   ```
3. Hidden products will:
   - Not appear in search results for customers
   - Show with a "Hidden" overlay in admin views
   - Have a visibility toggle (eye/eye-off icon) that can be clicked to change status
