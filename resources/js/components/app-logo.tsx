export default function AppLogo() {
    return (
        <div className="flex flex-col items-center justify-center py-4">
            {/* Logo image */}
            <img
                src="/logo/logo.png" // Path relative to public/
                alt="DS E Commerce"
                className="w-24 h-24 object-contain"
            />
        </div>
    );
}
