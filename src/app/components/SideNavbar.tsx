import Link from 'next/link';
import React from 'react';

const SideNavbar = () => {
  return (
    <nav className="h-screen bg-gray-100 p-4">
      <h2 className="text-xl mb-8">Menu</h2>
      <ul className="list-none p-0">
        <li className="mb-4">
          <Link href="/drafts">Drafts</Link>
        </li>
        <li className="mb-4">
          <Link href="/barcode">Barcode</Link>
        </li>
        <li className="mb-4">
          <Link href="/clinics">Clinics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;