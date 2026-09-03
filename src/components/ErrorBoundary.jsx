import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-2xl font-black">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-100">Something went wrong</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected display error occurred. Please click below to refresh and reload the showcase.
            </p>
            <div className="pt-2">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Reload Showcase Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
