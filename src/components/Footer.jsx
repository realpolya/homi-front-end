/* --------------------------------Component--------------------------------*/

 const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full flex flex-row justify-between
     p-4 bg-darkColor text-whiteColor text-sm">

        <p>homi © 2024 All rights reserved.</p>

        <div className="flex space-x-6">
            <a href="/about" className="hover:underline">
                About
            </a>
        </div>

    </footer>
  );
};

/* --------------------------------Exports--------------------------------*/

export default Footer