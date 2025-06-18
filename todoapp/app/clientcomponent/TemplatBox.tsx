'use client'

interface TemplatBoxProps{
    children: React.ReactNode;
}
const TemplateBox: React.FC<TemplatBoxProps> = ({
    children
}) => {
    return (  
        <div
            className="max-w-[100%] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            {children}
        </div>
    );
}
 
export default TemplateBox;