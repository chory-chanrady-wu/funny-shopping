"use client";

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          alert("✅ Message sent successfully! Thank you for contacting me.");
          formRef.current?.reset();
        },
        (error) => {
          console.error("❌ Email send failed:", error);
          alert("❌ Failed to send message. Try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-16">
          {/* Title */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground flex items-center justify-center md:justify-start gap-4">
              <span>Get In Touch</span>
              <div className="h-px bg-border flex-1 max-w-xs hidden md:block" />
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed text-pretty mx-auto md:mx-0">
              Please rach out to support center if you have any inquiry.
            </p>
          </div>

          {/* Contact Form and Info */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto md:mx-0">
            {/* Form */}
            <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-foreground">
                Send a Message
              </h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full group text-white bg-gray-800"
                  size="lg"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <Card className="p-6 hover:border-green-500 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:chorychanrady.wu@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      chorychanrady.wu@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:border-green-500 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+85510346085"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +855 10 346 085
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:border-green-500 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Send className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      Telegram
                    </h4>
                    <a
                      href="https://t.me/chorychanrady"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      @chorychanrady
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:border-green-500 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      Location
                    </h4>
                    <p className="text-muted-foreground">
                      271, Sangkat Ou Baek K'am, Khan Saen Sok
                      <br />
                      Phnom Penh, Cambodia
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
