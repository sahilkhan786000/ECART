"use strict";(self.webpackChunkecommerce_cart=self.webpackChunkecommerce_cart||[]).push([[533],{533:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});var a=r(43),o=r(579);const s=()=>{const[e,t]=(0,a.useState)([]),[r,s]=(0,a.useState)(!0),[c,l]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("userEmail");if(!e)throw new Error("User email not found in localStorage");const r=await fetch(`http://localhost:5000/cart/getCart?email=${e}`),a=await r.json();if(!Array.isArray(a))throw new Error("Fetched cart data is not an array");const o=i(a);t(o),s(!1)}catch(c){console.error("Error fetching cart items:",c),l(c.message),s(!1)}})()}),[]);const i=e=>{const t={};return e.forEach((e=>{t[e.title]?t[e.title].quantity+=e.quantity:t[e.title]={...e}})),Object.values(t)};return r?(0,o.jsx)("p",{children:"Loading..."}):c?(0,o.jsxs)("p",{children:["Error: ",c]}):(0,o.jsx)("div",{className:"container mx-auto p-4",children:0===e.length?(0,o.jsx)("h2",{className:"text-xl font-semibold",children:"Cart is empty"}):(0,o.jsxs)("div",{children:[(0,o.jsx)("h2",{className:"text-xl font-semibold",children:"Your items are:"}),(0,o.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",children:e.map((e=>(0,o.jsxs)("div",{className:"border rounded-lg p-4 shadow-md",children:[(0,o.jsx)("img",{src:e.image,alt:e.title,className:"w-full h-48 object-cover mb-2"}),(0,o.jsx)("h3",{className:"text-lg font-medium mb-2",children:e.title}),(0,o.jsxs)("p",{className:"text-gray-700",children:["Price: $",e.price.toFixed(2)]}),(0,o.jsxs)("p",{className:"text-gray-700",children:["Quantity: ",e.quantity]}),(0,o.jsx)("button",{className:"bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700",onClick:()=>(async e=>{try{const r=localStorage.getItem("userEmail");if(!(await fetch("http://localhost:5000/cart/deleteItem",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,productTitle:e})})).ok)throw new Error("Failed to delete item");t((t=>t.filter((t=>t.title!==e))))}catch(c){console.error("Error removing item:",c)}})(e.title),children:"Remove"})]},e.productId)))}),(0,o.jsx)("button",{className:"bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-800",onClick:async()=>{try{const e=localStorage.getItem("userEmail");if(!(await fetch("http://localhost:5000/cart/deleteAll",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})).ok)throw new Error("Failed to clear the cart");t([])}catch(c){console.error("Error clearing cart:",c)}},children:"Clear Cart"})]})})}}}]);
//# sourceMappingURL=533.53d80d22.chunk.js.map