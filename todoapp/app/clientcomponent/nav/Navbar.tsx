'use client'

import TemplateBox from "../TemplatBox";
import Logo from "./Logo";
import UserDrop from "./UserDrop";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shawdow-sm">
            <div
                className="py-2 border-b-[1px] z-10">
                <TemplateBox>
                    <div
                        className="flex flex-row item-center justify-between gap-3 md:gap-0">
                            <Logo />
                            <UserDrop />
                    </div>
                </TemplateBox>
            </div>
        </div>
    );
}

export default Navbar;