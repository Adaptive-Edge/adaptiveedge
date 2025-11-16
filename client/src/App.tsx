import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CursorBirds from "@/components/cursor-birds";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import Home from "@/pages/home";
import Work from "@/pages/work";
import CaseStudyPage from "@/pages/case-study";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import AdminLogin from "@/pages/admin-login";
import AdminBlogList from "@/pages/admin-blog-list";
import AdminBlogEditor from "@/pages/admin-blog-editor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/:slug" component={CaseStudyPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/blog" component={AdminBlogList} />
      <Route path="/admin/blog/new" component={AdminBlogEditor} />
      <Route path="/admin/blog/edit/:id" component={AdminBlogEditor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <CursorBirds />
          <Router />
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
