import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Ömür FM arayüz hatası:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#090507] px-6 text-center text-white">
          <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Ömür FM</p>
            <h1 className="mt-4 text-2xl font-semibold">Bir şeyler ters gitti</h1>
            <p className="mt-3 text-stone-400">Sayfayı yenileyerek tekrar deneyebilirsiniz.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-rose-700 px-5 py-3 font-semibold transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Sayfayı yenile
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
