'use client';

interface MenuItemsProp {
    onClick: () => void;
    label: string;
}

const MenuItems: React.FC<MenuItemsProp> = ({
    onClick,
    label
}) => {
    return ( 
        <div
            onClick={onClick}
            className="px-4 py-4 hover:bg-neutral-400 transition">
                {label}
        </div>
    );
}
 
export default MenuItems;