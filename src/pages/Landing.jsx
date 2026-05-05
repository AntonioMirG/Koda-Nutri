import React, { useState } from 'react';
import { Apple, Camera, PieChart } from 'lucide-react';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Landing({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fog text-ink font-sans pb-32">
      {/* App Global Navigation */}
      <nav className="bg-fog/80 backdrop-blur-md h-[44px] flex items-center px-6 max-w-[1024px] mx-auto z-50 fixed top-0 left-0 right-0 justify-between">
        <div className="flex items-center space-x-2 text-[14px] font-semibold text-ink">
          <Apple className="w-4 h-4" />
          <span>Koda</span>
        </div>
      </nav>

      <main className="pt-[100px]">
        {/* Hero Section */}
        <section className="text-center px-6 mb-16">
          <h1 className="font-display font-bold text-heading-lg md:text-display tracking-tight text-ink leading-tight mb-4 max-w-4xl mx-auto">
            Nutrition. <br /> Redefined.
          </h1>
          <p className="font-sans text-body text-graphite mb-10 max-w-2xl mx-auto">
            Powered by the revolutionary GPT-4o Vision chip. It breaks down every macro, every calorie, instantly.
          </p>
        </section>

        <section className="max-w-[1024px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

          {/* Auth Panel */}
          <div className="card-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative z-10 p-8 border border-silver-mist/50">
            <h2 className="font-display font-semibold text-heading-sm text-ink tracking-tight mb-2">
              {isLogin ? 'Sign in to Koda' : 'Create your account'}
            </h2>
            <p className="text-body-sm text-graphite mb-6">
              {isLogin ? 'Welcome back. Let\'s check those macros.' : 'Start your health journey today.'}
            </p>

            {error && <div className="bg-[#fff0f0] text-[#ff3333] p-3 rounded-small text-caption mb-4">{error}</div>}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-caption text-graphite mb-1 font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-fog border border-silver-mist rounded-small px-4 py-3 text-body-sm focus:outline-none focus:border-azure transition-colors"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-caption text-graphite mb-1 font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-fog border border-silver-mist rounded-small px-4 py-3 text-body-sm focus:outline-none focus:border-azure transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button disabled={loading} type="submit" className="w-full btn-primary py-3 flex justify-center items-center mt-2">
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-silver-mist"></div>
              <span className="px-4 text-caption text-graphite bg-snow">or</span>
              <div className="flex-1 border-t border-silver-mist"></div>
            </div>

            <button onClick={handleGoogleAuth} className="w-full bg-snow border border-silver-mist text-ink rounded-pill px-4 py-3 font-sans text-body-sm font-medium transition-colors hover:bg-fog flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-caption text-graphite mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-cobalt-link hover:underline">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Features showcase */}
          <div className="space-y-6 pt-8">
            <div className="card-fog border border-silver-mist bg-snow">
              <div className="w-12 h-12 rounded-full bg-fog flex items-center justify-center mb-4 border border-silver-mist">
                <Camera className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-display font-semibold text-heading-sm tracking-tight mb-2">Vision Scanner</h3>
              <p className="text-body-sm text-graphite">Snap a photo and let our neural engine dissect the ingredients instantly. No manual logging required.</p>
            </div>
            <div className="card-fog border border-silver-mist bg-snow">
              <div className="w-12 h-12 rounded-full bg-fog flex items-center justify-center mb-4 border border-silver-mist">
                <PieChart className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-display font-semibold text-heading-sm tracking-tight mb-2">Macro Breakdown</h3>
              <p className="text-body-sm text-graphite">Perfectly balanced. See exactly how much protein, fat, and carbs are in your meal in beautiful Apple-style charts.</p>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="max-w-[1024px] mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-heading text-ink tracking-tight mb-4">How it works.</h2>
            <p className="text-body text-graphite">Three simple steps to redefine your nutrition.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-snow border border-silver-mist flex items-center justify-center mx-auto mb-6 shadow-sm-soft">
                <span className="font-display font-bold text-heading-sm text-ink">1</span>
              </div>
              <h3 className="font-semibold text-body mb-2">Create your profile</h3>
              <p className="text-body-sm text-graphite">Tell us your goals and let our AI calculate your perfect daily targets.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-snow border border-silver-mist flex items-center justify-center mx-auto mb-6 shadow-sm-soft">
                <span className="font-display font-bold text-heading-sm text-ink">2</span>
              </div>
              <h3 className="font-semibold text-body mb-2">Snap your meals</h3>
              <p className="text-body-sm text-graphite">Just take a photo of your plate. No manual searching or logging required.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-snow border border-silver-mist flex items-center justify-center mx-auto mb-6 shadow-sm-soft">
                <span className="font-display font-bold text-heading-sm text-ink">3</span>
              </div>
              <h3 className="font-semibold text-body mb-2">AI does the rest</h3>
              <p className="text-body-sm text-graphite">GPT-4o Vision instantly analyzes ingredients, calories, and macros.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
