import React from "react";

interface DropdownMenuProps {
  trigger: React.ReactNode; // The trigger element (e.g., a button)
  items: { label: string; onClick: () => void }[]; // Menu items with labels and actions
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Menu Content */}
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200"
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
