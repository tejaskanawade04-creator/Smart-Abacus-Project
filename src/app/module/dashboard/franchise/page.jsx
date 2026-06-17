
import Navbar from "../../../../components/shared/Navbar";
import Footer from "../../../../components/shared/Footer";
export default function FranchiseDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-16"> 
                <h1 className="text-4xl font-bold text-blue-900 mb-4">Franchise Dashboard</h1>
                <p className="text-gray-700 mb-8">
                    Welcome to your Franchise Dashboard! Here you can manage your franchise operations, track student enrollments, access marketing materials, and connect with the Smart Abacus support team. Use the navigation below to explore the various tools and resources available to help you grow your franchise and provide exceptional Abacus education to your students.
                </p>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Franchise Management</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>View and manage student enrollments</li>

                        <li>Access marketing materials and resources</li>

                        <li>Connect with the Smart Abacus support team</li> 

                        <li>Track franchise performance and growth</li>
                    </ul>
                </section>
            </main>
            <Footer/>
        </div>
    );
}   