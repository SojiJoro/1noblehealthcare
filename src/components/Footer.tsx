// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-6 mt-8">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} 1 Noble Healthcare. All rights reserved.
      </p>
    </footer>
  )
}
