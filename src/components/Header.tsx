import chefClaudeLogo from "../images/chef-claude-icon.png"
export default function Header(){
    return(
        <header>
            <img src={chefClaudeLogo} alt="Chef Claude icon"/>
            <h1>Chef Claude</h1>
        </header>
    )
}