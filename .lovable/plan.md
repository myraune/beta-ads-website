# Remove "Pricing" from Header Navigation

## Change

Remove the "Pricing" link from the navbar in `src/components/Navbar.tsx`.

## Details

Update the `navLinks` array (lines 8-12) to remove the `{ href: "/pricing", label: "Pricing" }` entry. This removes it from both desktop and mobile navigation since both render from the same array.

Also smoothen the transition of the header when you start scrolling