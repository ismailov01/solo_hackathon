import React, { Fragment } from "react";
import '../Footer/Footer.css'
import telegram from './img/Без названия.png';
import instagram from "./img/instagram.svg";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <Fragment>
            <div className="mainFtr ">
                <div className="coMainFtr">
                    <div className="bireki ">
                        <h5>Покупателям</h5>
                        <Link to="/order">
                            <a href="#">Доставка</a>
                        </Link>
                        <Link to="/cart">
                            <a href="#">Оплата</a>
                        </Link>
                        <a href="#">Возврат товара</a>
                        <a href="#">Личный кабинет</a>
                    </div>
                    <div className="bireki ">
                        <h5>Информация</h5>
                        <a href="#">О нас</a>
                        <a href="#">FAQ</a>
                        <a href="#">Блог</a>
                        <a href="#">Контакты</a>
                        <a href="#">Обратная связь</a>
                    </div>
                    <div className="">
                        <h5>Мы на связи</h5>
                        <span className="number">+996 508 07-07-85</span>
                        <a target="blank" href="http://t.me/makers_hack_bot">
                            <img style={{ width: 35, height: 35, marginRight: '10px' }} src={telegram} />
                        </a>
                        <a target="blank" href="https://www.instagram.com/ismailovk2000/">
                            <img style={{ width: 35, height: 35, backgroundColor: '#fff' }} src={instagram} />
                        </a> 
                    </div>
                    <div className="col-3 right-side">
                        <h5>Подписка на новости</h5>
                        <span className="fourth">
                            Получите доступ к эксклюзивным скидкам
                        </span>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("worked");
                            }}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{color: '#fff'}}>Адрес электронной почты</Form.Label>
                                <Form.Control type="email" placeholder="Введите электронную почту" />
                                <Form.Text className="text-muted">
                                    Мы никогда никому не передадим вашу электронную почту
                                </Form.Text>
                            </Form.Group>
                        </Form>{" "}
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default React.memo(Footer);
