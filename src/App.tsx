import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to CaringWeb</h1>
        <p className="subtitle">Your caring solution for the web</p>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2>About CaringWeb</h2>
          <p>
            CaringWeb is a modern web application designed to provide caring solutions
            for your needs. We focus on delivering quality service with compassion and expertise.
          </p>
        </section>

        <section className="features-section">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🌟 Quality Service</h3>
              <p>We provide top-notch service tailored to your needs</p>
            </div>
            <div className="feature-card">
              <h3>💙 Compassionate Care</h3>
              <p>Every interaction is handled with care and empathy</p>
            </div>
            <div className="feature-card">
              <h3>🚀 Modern Solutions</h3>
              <p>Utilizing the latest technology for the best experience</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>Ready to experience caring web solutions? Contact us today!</p>
          <button className="contact-button">Contact Us</button>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 CaringWeb. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
