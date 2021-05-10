import React from "react";
import NewsletterInfo from "../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../Components/BottomInfo/BottomInfo";
import TopMenu from "../Components/TopMenu/TopMenu";
import { NavLink } from "react-router-dom";
import Logo from "../Components/Logo/Logo";

const terms = (props) => {
  return (
    <div className="terms">
      <div className="terms__general">
        <h1>terms & conditions</h1>
        <h2>
          Terms and conditions for the supply of goods through the Blau online
          store. These Terms and Conditions shall apply to all contracts entered
          into by Blau. By placing your order with us you are accepting these
          Terms and Conditions. Where you do not accept these Terms and
          Conditions in full, you do not have permission to access the contents
          of this website and should cease using it immediately. By visiting our
          site and/or purchasing something from us, you engage in our “Service”
          and agree to be bound by the following terms and conditions.
        </h2>
      </div>
      <ul className="terms__list">
        <li>
          <h4>Contract</h4>
          <h2>
            No contract will exist between you and Blau for
            the sale of any product unless and until Blau has
            accepted your order with a confirmation email and a full payment is
            taken. Our acceptance of
            your order brings into existence a legally binding contract between
            us. Blau reserves the
            right not to accept your order in the event that we are unable to
            obtain authorisation for payment, if shipping restrictions apply to
            a particular item, if the item ordered does not meet our quality
            control standards and is withdrawn, out of stock or if there is an
            error in pricing or content. We may also refuse to process and
            therefore accept a transaction for any reason or refuse service to
            anyone at any time at our sole discretion. We will not be liable for
            any indirect or consequential loss, damage or expenses arising from
            not accepting your order and we shall have no liability to you, by
            way of compensation, other than to refund the amount paid for the
            goods in question.
          </h2>
        </li>
        <li>
          <h4>Payment</h4>
          <h2>
            By purchasing on this site you confirm that bank account or credit/debit card that is being used is yours or that you have been
            specifically authorised by the owner of the account or
            credit/debit card to use it. All credit/debit cardholders are
            subject to validation checks and authorisation by the card issuer.
            If the issuer of your payment card refuses to authorise payment we
            will not be liable for any delay or non-delivery. Payment can be
            made by Dotpay or via your credit/debit card. The
            prices payable for ordered goods are as set out in our website in
            PLN. All prices are inclusive of the Polish VAT. Delivery
            charges will be clearly displayed when selected and included in the
            total cost.
          </h2>
        </li>
        <li>
          <h4>Order cancellation</h4>
          <h2>
            Unless you cancel your order within 5 working days after full
            payment has been made, acceptance of your order and completion of
            the contract between you and Blau will be
            completed when the goods have been dispatched. To cancel your
            contract you must notify us of your decision by email here using the
            subject heading ‘Cancellation’ and supplying your order number and
            address. Any returns after the 5 day period stated above will be at
            the discretion of Blau.
          </h2>
        </li>
        <li>
          <h4>Defective items</h4>
          <h2>
            All parcels must immediately be opened in the presence of the
            Courier upon receipt of the goods, to verify that the Goods are
            contained in the parcel are untampered with and undamaged. You
            acknowledge that if you fail to do this and subsequently find the
            Goods are not contained therein, or have been damaged during
            delivery, we may not be able to claim against the Courier or against
            our insurers. Accordingly, if you do fail to do this, you agree that
            you will be solely liable for any such loss or damage and shall
            waive, release and indemnify us from and against any claims relating
            thereto, to the fullest extent permitted by applicable law. If you
            should receive an item that is defective, damaged or not what you
            ordered, please contact us here within 5 working days. We will help
            you resolve any issues as quickly as possible by replacing the item,
            once the faulty item has been returned to us by post. We will
            confirm the return address in writing, once you have contacted us
            about the fault.
          </h2>
        </li>
        <li>
          <h4>Refunds & exchanges</h4>
          <h2>
            In the unlikely event that you are unhappy with your order please
            don’t hesitate to contact us here. In certain circumstances we
            may be able to offer an exchange for another piece. Upon receipt of items, the bank account,
            credit or debit card originally used for the purchase will be
            credited with the cost of the goods minus the delivery charges
            (exceptions may apply). We will process your refund within 48 hours
            of receipt. Your credit card company may take 4-7 working days to
            credit your account.
          </h2>
        </li>
      </ul>
      <NavLink className="logo-container" to={"/"}>
        <Logo />
      </NavLink>
      <BottomInfo />
      <NewsletterInfo />
      <TopMenu />
    </div>
  );
};

export default terms;
