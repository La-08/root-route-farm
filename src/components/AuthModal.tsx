import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { AlertCircle, Loader2, Sprout } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getDashboardPath } from '@/components/ProtectedRoute';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '' as UserRole | ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as UserRole
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(
      loginData.email, 
      loginData.password, 
      loginData.role || undefined
    );

    if (success) {
      onClose();
      // Redirect to appropriate dashboard after successful login
      // Get the updated user from context after login
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser.role) {
          const dashboardPath = getDashboardPath(currentUser.role);
          navigate(dashboardPath);
        }
      }, 100);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signupData.name || !signupData.email || !signupData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = await signup({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      role: signupData.role
    });

    if (success) {
      if (signupData.role === 'farmer') {
        setSuccess('Account created! Your farmer registration is pending verification.');
        setTimeout(() => {
          onClose();
          // Redirect to farmer dashboard even if pending verification
          navigate(getDashboardPath('farmer'));
        }, 2000);
      } else {
        onClose();
        // Redirect to appropriate dashboard after successful signup
        setTimeout(() => {
          const dashboardPath = getDashboardPath(signupData.role);
          navigate(dashboardPath);
        }, 100);
      }
    } else {
      setError('User already exists with this email');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-2 rounded-full gradient-primary">
              <Sprout className="h-5 w-5 text-white" />
            </div>
          </div>
          <CardTitle className="text-lg">Welcome to Roots & Routes</CardTitle>
          <CardDescription className="text-sm">
            Connect with local farmers for fresh produce
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab as any}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="login-email" className="text-sm">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="login-password" className="text-sm">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="login-role" className="text-sm">Role (Optional)</Label>
                  <Select value={loginData.role} onValueChange={(value: UserRole) => setLoginData({ ...loginData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-detect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="delivery">Delivery Partner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Login
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  <p className="font-medium">Demo: customer@example.com</p>
                  <p>farmer@example.com | delivery@example.com</p>
                  <p>Password: password</p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name" className="text-sm">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="Your name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-role" className="text-sm">I am a</Label>
                    <Select value={signupData.role} onValueChange={(value: UserRole) => setSignupData({ ...signupData, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="delivery">Delivery Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="signup-email" className="text-sm">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="text-sm">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-confirm" className="text-sm">Confirm</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>

                {signupData.role === 'farmer' && (
                  <div className="text-sm text-muted-foreground">
                    <p>Note: Farmer accounts require verification before you can list products.</p>
                  </div>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <Button variant="ghost" onClick={onClose} className="w-full mt-3 text-sm">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
