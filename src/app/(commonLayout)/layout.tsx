import Navbar from "@/components/shared/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="min-h-screen  bg-background font-sans antialiased">
                <Navbar></Navbar>
            </div>
 
            <div className=" relative flex min-h-screen -mt-220 flex-col" >
                {children}
            </div>
        </div>

    );
};

export default CommonLayout;