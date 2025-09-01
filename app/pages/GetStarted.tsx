import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faBook, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons"

export default function GetStarted() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#E6CFA9] text-[#9A3F3F] py-12">
        <div className="container mx-auto text-center px-6 py-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 pt-6">
            Bookify – Smart Accounting, Simplified
          </h1>
          <p className="text-lg md:text-xl mb-6 py-4">
            Turn your journal entries into accurate financial statements—instantly.
          </p>
          <a
            href="#get-started"
            className="bg-[#C1856D] hover:bg-[#9A3F3F] text-2xl text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#FBF9D1]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#9A3F3F]">
            Why Choose Bookify?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-[#6b2929]">
            {/* Feature 1 */}
            <div className="bg-[#faf3d1] p-6 rounded-xl shadow hover:shadow-lg transition">
              <FontAwesomeIcon
                icon={faBook}
                className="text-[#C1856D] text-5xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Easy Journal Entries</h3>
              <p>
                Record transactions quickly with an intuitive, user-friendly interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#faf3d1] p-6 rounded-xl shadow hover:shadow-lg transition">
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="text-[#C1856D] text-5xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Automated Statements</h3>
              <p>
                Generate balance sheets, income statements, and more in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#faf3d1] p-6 rounded-xl shadow hover:shadow-lg transition">
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-[#C1856D] text-5xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Accurate & Compliant</h3>
              <p>
                Built on GAAP principles to ensure compliance and precision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}