import { GiMartini } from "react-icons/gi";
import { WiDaySunny } from "react-icons/wi";
import { FaWineGlass } from "react-icons/fa";
import { GiChampagneCork } from "react-icons/gi";


function SectionTitle({ title }) {
    return <h2 className="section-title">{title}</h2>;
}

function MenuItem({ title, price, description }) {
    return (
        <div className="menu-item">
            <div className="item-header">
                <span className="item-title">{title}</span>
                <span className="item-price">€{price}</span>
            </div>
            {description && <p className="item-description">{description}</p>}
        </div>
    );
}

function DrinkItem({ name }) {
    return <p className="drink-item">{name}</p>;
}
function MenuSection({ title, icon, items }) {
    return (
        <div className="menu-section">
            <h2 className="section-title">
                {icon && <span className="icon-inline">{icon}</span>}
                {title}
            </h2>
            <div className="section-divider" />
            {items.map((item, idx) => (
                <MenuItem
                    key={idx}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                />
            ))}
        </div>
    );
}


export default function Menu() {
    const viniBianchi = [
        { title: "Tagliere di salumi", price: "8.00", description: "Tagliere di salumi misti (prosciutto, salame, mortadella) e scelta di formaggi." },
        { title: "Piadina della casa", price: "6.00", description: "Piadina con prosciutto e formaggio." },
        { title: "Focaccia farcita", price: "7.50", description: "Focaccia al forno con ripieno a scelta tra prosciutto, salame e formaggio." },
        { title: "Tramezzino ripieno", price: "4.50", description: "Tramezzino con ripieno di salume a scelta e aggiunte (insalata, maionese, formaggio)." },
    ];

    const bollicine = [
        { title: "Hamburger classico", price: "12.00", description: "Hamburger di manzo con pomodoro, insalata, formaggio e maionese." },
        { title: "Polpette al sugo", price: "9.00", description: "Polpette di maiale e manzo con sugo di pomodoro, basilico e parmigiano." },
        { title: "Carpaccio di manzo", price: "11.50", description: "Fette di carpaccio di manzo servite con rucola, olio d’oliva e scelta di formaggi." },
        { title: "Insalata di pollo", price: "8.50", description: "Insalata mista fresca con bocconcini di pollo, salsa yogurt, crostini e parmigiano." },
    ];

    const drinks = ["Americano", "Negroni", "Gin Tonic"];
    const extras = [
        { title: "€5.00" },
        { title: "€5.50" },
        { title: "Gelato con fragole", price: "5.50" },
    ];

    return (
        <div className="menu-container">
            <h1 className="menu-title">
                {/*NERO<br />CAFE*/}
                <img alt="logo" src="/images/logo.png"></img>
            </h1>

            <div className="menu-wrapper">
                <div className="menu-left">
                    <MenuSection
                        title="VINI BIANCHI"
                        icon={<FaWineGlass />}
                        items={viniBianchi}
                    />
                    <div className="mt10"> </div>
                    <MenuSection
                        title="BOLLICINE"
                        icon={<GiChampagneCork />}
                        items={bollicine}
                    />

                </div>
                <div className="menu-right">
                    <div className="drinks-section">
                        <div className="drinks-header">
                            <h2><GiMartini className="icon-inline" /> DRINKS CLASSICI</h2>
                            <span className="item-price">€8</span>
                        </div>
                        <div className="section-divider" />
                        {drinks.map((drink, idx) => (
                            <DrinkItem key={idx} name={drink} />
                        ))}
                    </div>
                    {/*<div className="extra-items">
                        {extras.map((item, idx) => (
                            <DrinkItem key={idx} name={item.title} />
                        ))}
                    </div>*/}
                    <div className="footer-box">
                        <p className="footer-title">TUTTI I GIORNI<br />DALLE 18:00</p>
                        <div className="sun-icon"><WiDaySunny /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
