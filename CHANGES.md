# Site Planning

After reviewing the project repository, the frontend currently consists of a single page React application showing the `Dumbo` mascot. There is basic navigation but no routing or store functionality.

## Pages Needed for Full Experience
1. **Home Page** – introduction to the brand and featured mascots.
2. **Shop / Store Page** – list novelty items (fuqs, shits, damns). Should include categories and filters.
3. **Product Detail Page** – description and purchase options for individual items.
4. **Mascot Pages** – dedicated pages for each mascot with animations, backstory, and catchphrases.
5. **Cart & Checkout** – persistent cart, payment processing (Stripe), confirmation page.
6. **About / Story Page** – explain the dark‑humor concept and mission.
7. **Account / Login Page** – optional user accounts for order history.
8. **404 / Error Page** – custom error handling in the same style.

## Comparison to Similar Site
A comparable user experience can be found on character-based stores like the **CD Projekt Red Gear Store** or **Pusheen Shop**. These sites use vivid art, product categories, and animated characters to engage shoppers. Key similarities:
- Character art is integrated across pages (banners, item images).
- Clear navigation between store sections and character lore.
- Responsive design with themed colors and fonts.

Our current project lacks most of these pages and e‑commerce elements. Implementing the above structure will help achieve a complete experience.

## Recommendations
- Introduce React Router to handle multi-page navigation.
- Build reusable components for product cards and mascot bios.
- Add stripe checkout flow using the backend API.
- Ensure all pages follow the cyberpunk neon aesthetic.

