import React, { useState, useEffect } from 'react';
import { User, Target, Activity, Calendar, Save, LogOut } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);
          setFormData(data.profile);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, { profile: formData });
      setProfileData(prev => ({ ...prev, profile: formData }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading && !profileData) {
    return <div className="p-6 text-center text-graphite">Loading profile...</div>;
  }

  return (
    <div className="pb-24">
      <header className="pt-12 px-6 pb-6 max-w-lg mx-auto">
        <h1 className="font-display font-semibold text-heading-sm tracking-tight mb-2">Profile</h1>
        <p className="text-body-sm text-graphite">Manage your goals and personal data.</p>
      </header>

      <div className="px-6 max-w-lg mx-auto space-y-6">
        
        {/* User Info Card */}
        <div className="card-white shadow-sm-soft border border-silver-mist">
           <div className="flex justify-between items-center mb-6">
             <div className="flex items-center space-x-3">
               <div className="w-12 h-12 bg-fog rounded-full flex items-center justify-center border border-silver-mist">
                 <User className="w-6 h-6 text-ink" />
               </div>
               <div>
                 <div className="font-semibold text-body-sm">{auth.currentUser?.email}</div>
                 <div className="text-caption text-graphite">Nutri-AI Pro Member</div>
               </div>
             </div>
             {!isEditing ? (
               <button onClick={() => setIsEditing(true)} className="text-cobalt-link text-body-sm hover:underline">Edit</button>
             ) : (
               <button onClick={handleSave} disabled={loading} className="text-azure font-medium text-body-sm hover:opacity-70 flex items-center"><Save className="w-4 h-4 mr-1"/> Save</button>
             )}
           </div>

           {formData && (
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-[10px] text-graphite uppercase font-semibold mb-1">Age</label>
                 {isEditing ? (
                   <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full bg-fog border border-silver-mist rounded p-2 text-body-sm" />
                 ) : (
                   <div className="font-medium text-body-sm">{formData.age} yrs</div>
                 )}
               </div>
               <div>
                 <label className="block text-[10px] text-graphite uppercase font-semibold mb-1">Gender</label>
                 {isEditing ? (
                   <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full bg-fog border border-silver-mist rounded p-2 text-body-sm">
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                   </select>
                 ) : (
                   <div className="font-medium text-body-sm">{formData.gender}</div>
                 )}
               </div>
               <div>
                 <label className="block text-[10px] text-graphite uppercase font-semibold mb-1">Weight (kg)</label>
                 {isEditing ? (
                   <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full bg-fog border border-silver-mist rounded p-2 text-body-sm" />
                 ) : (
                   <div className="font-medium text-body-sm">{formData.weight} kg</div>
                 )}
               </div>
               <div>
                 <label className="block text-[10px] text-graphite uppercase font-semibold mb-1">Height (cm)</label>
                 {isEditing ? (
                   <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full bg-fog border border-silver-mist rounded p-2 text-body-sm" />
                 ) : (
                   <div className="font-medium text-body-sm">{formData.height} cm</div>
                 )}
               </div>
             </div>
           )}
        </div>

        {/* Goals & Targets */}
        {profileData?.targets && (
          <div className="card-white shadow-sm-soft border border-silver-mist">
             <div className="flex items-center mb-4">
               <Target className="w-5 h-5 mr-2 text-ink" />
               <h3 className="font-display font-semibold text-body">Daily Targets (AI Calculated)</h3>
             </div>
             <p className="text-caption text-graphite mb-6">Based on your goal to <span className="font-semibold text-ink">{profileData.profile.goal}</span>.</p>
             
             <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                   <div className="text-[10px] text-graphite font-semibold">CALORIES</div>
                   <div className="font-bold text-heading-sm text-ink">{profileData.targets.targetCalories}</div>
                </div>
                <div>
                   <div className="text-[10px] text-graphite font-semibold">PROTEIN</div>
                   <div className="font-bold text-heading-sm text-[#ff3b30]">{profileData.targets.targetProtein}g</div>
                </div>
                <div>
                   <div className="text-[10px] text-graphite font-semibold">CARBS</div>
                   <div className="font-bold text-heading-sm text-[#ff9500]">{profileData.targets.targetCarbs}g</div>
                </div>
                <div>
                   <div className="text-[10px] text-graphite font-semibold">FATS</div>
                   <div className="font-bold text-heading-sm text-[#0071e3]">{profileData.targets.targetFats}g</div>
                </div>
             </div>
          </div>
        )}

        {/* History / Calendar Mock */}
        <div className="card-fog border border-silver-mist bg-snow">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center">
               <Calendar className="w-5 h-5 mr-2 text-ink" />
               <h3 className="font-display font-semibold text-body">Consistency</h3>
             </div>
             <span className="text-caption text-azure font-medium cursor-pointer">View all</span>
           </div>
           
           <div className="flex justify-between mt-4">
             {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="text-[10px] text-graphite font-semibold mb-2">{day}</div>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${i < 4 ? 'bg-[#34c759]/20 border-[#34c759]' : 'border-silver-mist bg-fog'}`}>
                   {i < 4 && <div className="w-2 h-2 rounded-full bg-[#34c759]"></div>}
                 </div>
               </div>
             ))}
           </div>
        </div>

        <button onClick={handleLogout} className="w-full text-center py-4 text-[#ff3b30] font-medium text-body-sm mt-4 hover:bg-[#ff3b30]/10 rounded-small transition-colors">
          Sign Out from Nutri-AI
        </button>

      </div>
    </div>
  );
}
