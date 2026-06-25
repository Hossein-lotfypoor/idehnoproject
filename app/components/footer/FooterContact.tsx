import { memo } from "react";

interface ContactItem {
  icon: React.ReactNode;
  text: string;
}

interface FooterContactProps {
  contacts: ContactItem[];
}

function FooterContact({ contacts }: FooterContactProps) {
  return (
    <div>
      <h4 className="text-lg font-bold mb-4 text-blue-400">تماس با ما</h4>
      <ul className="space-y-3">
        {contacts.map((contact, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-400">
            {contact.icon}
            <span>{contact.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(FooterContact);
