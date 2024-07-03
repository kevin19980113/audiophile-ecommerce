import { CheckoutSchemaType } from "@/lib/schema";
import { CartItem } from "@/types/cart";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { formatPrice } from "@/lib/utils";

type EmailTemplateProps = {
  checkoutData: CheckoutSchemaType;
  items: CartItem[];
  orderNumber: string | undefined;
  trackingNumber: string | undefined;
};

export default function EmailTemplate({
  checkoutData,
  items,
  orderNumber,
  trackingNumber,
}: EmailTemplateProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Html>
      <Head />
      <Preview>
        Get your order summary, estimated delivery date and more
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Tracking Number</Text>
                <Text style={track.number}>{trackingNumber}</Text>
              </Column>
              <Column align="right">
                <Link href="/" style={global.button}>
                  Track Package
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Heading style={global.heading}>It&apos;s On Its Way.</Heading>
            <Text style={global.text}>
              You order&apos;s is on its way. Use the link above to track its
              progress.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              We´ve also charged your payment method for the cost of your order
              and will be removing any authorization holds. For payment details,
              please visit your Orders page on Audiophile.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text
              style={adressTitle}
            >{`Shipping to: ${checkoutData.name}`}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {`${checkoutData.address}, ${checkoutData.city}, ${checkoutData.country}, ${checkoutData.zipCode}`}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section
            style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
          >
            {items.map((item) => (
              <Row key={item.name}>
                <Column>
                  <Img
                    src={item.image}
                    alt={item.name}
                    style={{ float: "left" }}
                    width="260px"
                  />
                </Column>
                <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                  <Text style={{ ...paragraph, fontWeight: "500" }}>
                    {item.name}
                  </Text>
                  <Text
                    style={global.text}
                  >{`Order quantity: ${item.quantity}`}</Text>
                  <Text style={global.text}>{`Price: ${formatPrice({
                    price: item.price,
                    options: { maximumFractionDigits: 2 },
                  })}`}</Text>
                  <Text style={global.text}>{`Grand Total: ${formatPrice({
                    price: item.price * item.quantity,
                    options: { maximumFractionDigits: 2 },
                  })}`}</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{orderNumber}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>{today}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link href="/" style={global.button}>
                  Order Status
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Row>
              <Text style={menu.title}>Get Help</Text>
            </Row>
            <Row style={menu.content}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping Status
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping & Delivery
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Returns & Exchanges
                </Link>
              </Column>
            </Row>
            <Row style={{ ...menu.content, paddingTop: "0" }}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  How to Return
                </Link>
              </Column>
              <Column style={{ width: "66%" }} colSpan={2}>
                <Link href="/" style={menu.text}>
                  Contact Options
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>Audiophile.com</Text>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: "12px" }} />
          <Section style={paddingY}>
            <Row style={footer.policy}>
              <Column>
                <Text style={footer.text}>Web Version</Text>
              </Column>
              <Column>
                <Text style={footer.text}>Privacy Policy</Text>
              </Column>
            </Row>
            <Row>
              <Text
                style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}
              >
                Please contact us if you have any questions. (If you reply to
                this email, we won&apos;t be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © 2024 Audiophile, Inc. All Rights Reserved.
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                Audiophile, INC. 123 Abc St, Ontario, Toronto, CANADA.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
    cursor: "pointer",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
