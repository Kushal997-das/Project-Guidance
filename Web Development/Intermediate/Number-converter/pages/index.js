import HeadTag from "../components/HeadTag"
import Header from "../components/Header";
import Convert from "../components/Convert";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="bg-[#F6F8FF] dark:bg-[#26272b]">
      <div className="min-h-screen flex flex-col max-w-5xl mx-auto">
        {/* ======== Head Tag ====== */}
        <HeadTag/>

        {/* ======== Header ======= */}
        <Header/>

        {/* ====== Main ======== */}
        <main>
          {/* ========= Chat Section ============ */}
          <Hero/>

          {/* ===== Convert section ===== */}
          <Convert/>
        </main>

        {/* =============== Footer ============= */}
        <Footer/>
      </div>
    </div>
  )
}