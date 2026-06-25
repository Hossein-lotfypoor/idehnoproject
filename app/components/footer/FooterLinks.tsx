import { memo } from "react";

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h4 className="text-lg font-bold mb-4 text-blue-400">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(FooterLinks);
