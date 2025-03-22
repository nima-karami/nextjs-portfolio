import ContactCard from '@/components/contact-card';
import { contacts } from '@/data/contacts';

const ContactPage: React.FC = () => {
  return (
    <div className="flex h-full w-full  items-center justify-center gap-6 overflow-hidden px-8 pt-8  sm:px-20 sm:pb-20 sm:pt-32">
      <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
        {contacts.map((item, index) => (
          <ContactCard key={index} contact={item} />
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
