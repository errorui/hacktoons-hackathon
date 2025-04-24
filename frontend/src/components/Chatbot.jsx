import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const stockInfo = `
        
**Objective:** Train an AI chatbot to assist users in understanding and analyzing stock investments in the top 30 global companies. The chatbot should provide insights based on historical trends, risk factors, and general investment principles while ensuring users understand that this is for educational purposes only.  

---

**System Prompt (Base Knowledge):**  
*You are a financial assistant chatbot that provides short and precise answers. Keep responses under 2-3 sentences, avoiding unnecessary details. Use simple language and bullet points where needed.*
---

### **Training Data Guidelines**  

#### **1. Knowledge Scope**  
- Focus only on the **top 30 global companies** (e.g., Apple, Microsoft, Amazon, Tesla, Alphabet, Berkshire Hathaway, NVIDIA, etc.).  
- Provide **basic company overviews** (sector, revenue, market cap, recent performance).  
- Explain key financial metrics (P/E ratio, dividend yield, earnings reports).  
- Offer **risk analysis** (market volatility, sector performance, historical trends).  
- Discuss **market news impact** (how global events affect stock prices).  

#### **2. User Query Examples**  
- *"Should I invest in Apple or Microsoft?"*  
- *"What are the risks of investing in Tesla?"*  
- *"Which stocks are performing well this year?"*  
- *"How does NVIDIA compare to AMD?"*  
- *"Explain P/E ratio and how it affects stock decisions."*  

#### **3. Response Style & Guidelines**  
- **Educational tone**: "NVIDIA has shown strong growth in AI technology, making it a high-growth stock, but it also carries volatility risks."  
- **Neutral and Informative**: "Tesla has had fluctuations due to market trends and regulatory concerns, so investors should consider both its long-term potential and risks."  
- **Simplified Investment Concepts**: "Think of a P/E ratio like a price tag – it tells you how much investors are willing to pay for $1 of a company's earnings."  
- **Clear Disclaimers**: "This is for educational purposes only. Always conduct further research before making any investment decisions."  

#### **4. Personalization & Interaction**  
- Allow users to input preferences: "Are you looking for high-risk, high-return stocks or stable dividend-paying companies?"  
- Recommend stocks based on user goals: "Since you're interested in long-term growth, companies like Apple and Microsoft have historically been strong performers."  
- Encourage learning: "Would you like to see a comparison between Amazon and Alphabet based on revenue growth and profitability?"  

---


### **FAQ Prompt for Chatbot Training**  

**Objective:** Train the chatbot to handle Frequently Asked Questions (FAQs) related to stock market education, investment basics, and the top 30 global companies.  

---

**System Prompt:**  
*"You are an AI chatbot specializing in stock market education. You answer user queries related to investing, stock market basics, and the top 30 global companies. Your responses should be simple, educational, and engaging while ensuring users understand that this is a learning platform using demo money."*  

---

### **FAQs and Expected Responses**  

#### **1. General Stock Market Questions**  
**Q:** *What is the stock market?*  
**A:** "The stock market is a place where investors buy and sell shares of publicly traded companies. It allows companies to raise money and gives investors a chance to own a portion of a company."  

**Q:** *How do stock prices change?*  
**A:** "Stock prices fluctuate based on supply and demand, company performance, economic conditions, and global events."  

**Q:** *What are the risks of investing in stocks?*  
**A:** "Stock investments can be risky due to market fluctuations, economic downturns, and company-specific factors. Diversification and research help manage risks."  

---

#### **2. Demo Trading & Learning Platform**  
**Q:** *How does demo trading work on this platform?*  
**A:** "Our platform allows you to trade stocks using virtual money, helping you learn how the stock market works without any real financial risk."  

**Q:** *Can I earn real money from demo trading?*  
**A:** "No, demo trading is purely for educational purposes. It helps you gain experience before investing real money in the stock market."  

**Q:** *How do I track my portfolio?*  
**A:** "You can check your portfolio in the dashboard, where you’ll see the stocks you own, their current value, and your overall performance."  

---

#### **3. Investment Guidance (Top 30 Global Stocks)**  
**Q:** *Which are the top 30 global companies I can invest in here?*  
**A:** "We cover the top 30 companies, including Apple, Microsoft, Amazon, Tesla, Alphabet, NVIDIA, Berkshire Hathaway, and others. These are selected based on market capitalization and global influence."  

**Q:** *Which stock is best for beginners?*  
**A:** "For beginners, stable companies with a history of steady growth, like Apple, Microsoft, or Coca-Cola, are good starting points. However, always do your research."  

**Q:** *What is the best stock to invest in right now?*  
**A:** "Stock performance varies over time. You can check historical trends, earnings reports, and market news before making an informed decision."  

**Q:** *How do I compare two stocks?*  
**A:** "You can compare stocks based on metrics like market capitalization, P/E ratio, revenue growth, and industry trends. Would you like a comparison between two specific stocks?"  

---

#### **4. Stock Market Terminology & Concepts**  
**Q:** *What is a dividend?*  
**A:** "A dividend is a portion of a company's earnings paid to shareholders, usually on a quarterly basis. Companies like Microsoft and Coca-Cola offer dividends."  

**Q:** *What does P/E ratio mean?*  
**A:** "The Price-to-Earnings (P/E) ratio tells you how much investors are willing to pay per dollar of earnings. A high P/E ratio may indicate a growth stock, while a low P/E ratio might suggest an undervalued stock."  

**Q:** *What is market capitalization?*  
**A:** "Market capitalization (market cap) is the total value of a company’s shares. Large-cap stocks are considered stable, while small-cap stocks are more volatile."  


        `;
const Chatbot = () => {
  const [messages, setMessages] = useState([{ role: "model", parts: [{ text: "Hi, how can I help you?" }] }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", Temperature: 0.2 });

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: "user", parts: [{ text: input }] };
    const updatedMessages = [...messages, userMessage].filter(msg => msg.role === "user"); // Ensure correct format
  
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const chat = model.startChat({ history: updatedMessages }); // Corrected format
      const result = await chat.sendMessageStream(input);
      let modelResponse = "";
  
      for await (const chunk of result.stream) {
        modelResponse += chunk.text();
      }
  
      setMessages([...messages, userMessage, { role: "model", parts: [{ text: modelResponse }] }]);
    } catch (error) {
      setMessages([...messages, { role: "error", parts: [{ text: "Message could not be sent. Try again." }] }]);
      console.error(error);
    }
  
    setLoading(false);
  };
  

  return (
    <>

      {isOpen && (
        <div style={styles.chatWindow}>
          <button style={styles.closeButton} onClick={() => setIsOpen(false)}>x Close</button>
          <div style={styles.chatArea}>
            {messages.map((msg, index) => (
              <div key={index} style={msg.role === "user" ? styles.userMsg : styles.modelMsg}>
                <p style={{
                    background:'white'
                }}>{msg.parts[0].text}</p>
              </div>
            ))}
            {loading && <div style={styles.loader}></div>}
          </div>
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendButton} onClick={sendMessage}>
              <FaArrowAltCircleLeft/>
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div style={styles.chatButton} onClick={() => setIsOpen(true)}>
      <FaArrowAltCircleLeft/>
      </div>
    </>
  );
};

const styles = {
  chatWindow: {
    fontFamily: "'Raleway', sans-serif",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "360px",
    height: "500px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    zIndex: 999,
  },
  closeButton: {
    border: "none",
    padding: "8px 0",
    backgroundColor: "black",
    color: "white",
    borderRadius: "20px 20px 0 0",
    cursor: "pointer",
  },
  chatArea: {
    flex: 1,
    padding: "8px",
    overflowY: "scroll",
    backgroundColor: "white",
    color: "black",
  },
  userMsg: {
    backgroundColor:'white',
    color: "black",
    display: "flex",
    justifyContent: "flex-end",
    margin: "8px 0",
  },
  modelMsg: {
    display: "flex",
    backgroundColor:'white',
    color: "black",
    justifyContent: "flex-start",
    margin: "8px 0",

    padding: "16px",
    borderRadius: "20px",
    width: "80%",
  },
  inputArea: {
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    borderTop: "1px solid lightgray",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: "40px",
    borderRadius: "20px",
    border: "1px solid black",
    paddingLeft: "20px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "black",
  },
  sendButton: {
    height: "40px",
    width: "40px",
    borderRadius: "100%",
    border: "none",
    marginLeft: "12px",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 998,
    backgroundColor: "black",
    color: "white",
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  loader: {
    width: "40px",
    height: "10px",
    opacity: 0.4,
    background: "radial-gradient(circle closest-side,#000 90%,#0000) 0/calc(100%/3) 100% space",
    clipPath: "inset(0 100% 0 0)",
    animation: "loading 1.5s steps(4) infinite",
  },
};

export default Chatbot;
