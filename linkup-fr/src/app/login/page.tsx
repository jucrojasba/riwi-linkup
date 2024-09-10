import "./loginStyles.css";
import { LogInForm } from "@/UI/components/molecules";
export default function LoginView(): JSX.Element{
    return(
        <main className="main">
            <section className="main-section">
                <div>Image</div>
                <LogInForm />
            </section>
        </main>
    );
}