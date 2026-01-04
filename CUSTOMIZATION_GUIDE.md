# Darassa Academy App - Customization Guide (Level 2)

This guide outlines advanced CSS customization strategies to enhance the visual appeal of the Darassa Academy mobile app without altering the core Angular logic, ensuring easier future updates.

## 1. Global Styling Strategy
All custom CSS should be placed in:
`src/theme/theme.custom.scss`

This file is imported after the default Ionic/Moodle styles, allowing you to override them safely.

## 2. Recommended Customizations

### A. Typography (Fonts)
To give the app a unique feel, import a custom font (e.g., from Google Fonts).
**Example:**
```scss
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
    font-family: 'Poppins', sans-serif !important;
}
```

### B. Modern "Card" Styling
Transform standard list items into modern cards with drop shadows and rounded corners.
**Target Elements:** `.list-item`, `.card`
**Example:**
```scss
ion-card, .core-course-list-item {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    border: none;
    background: #ffffff;
    margin-bottom: 12px;
}
```

### C. Gradients & Buttons
Replace flat colors with gradients for a more premium look.
**Target Elements:** `ion-button`, `.bar-button`
**Example:**
```scss
ion-button.button-solid {
    --background: linear-gradient(135deg, #7D256C 0%, #4a1540 100%);
    --border-radius: 8px;
    text-transform: none; // Remove uppercase default
    font-weight: 600;
}
```

### D. Navigation Bar
Make the header cleaner or more branded.
**Example:**
```scss
ion-header ion-toolbar {
    --background: #ffffff;
    --color: #7D256C; // Brand color for text
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
```

### E. Background Texture
Add a subtle pattern or image behind the content.
**Example:**
```scss
ion-content {
    --background: #f4f6f9 url('assets/img/subtle-pattern.png') repeat;
}
```

## 3. Workflow
1.  Make changes in `src/theme/theme.custom.scss`.
2.  Run `npm start` to preview instantly in the browser.
3.  Use Browser Developer Tools (F12) to identify the CSS classes of elements you want to change.

## 4. Limitations
*   **Avoid:** Changing layout logic (e.g., moving the menu from left to bottom) purely with CSS is difficult and buggy.
*   **Logic:** CSS cannot add new buttons or features, only style existing ones.
