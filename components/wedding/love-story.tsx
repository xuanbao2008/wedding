'use client'

import { motion } from 'framer-motion'
import { Heart, Swords, Users, Coffee, Plane, Home } from 'lucide-react'

const storyTimeline = [
  {
    icon: Swords,
    title: "Khởi đầu từ Vovinam",
    description: "Câu chuyện bắt đầu từ lớp học Vovinam, nơi anh là người đứng lớp. Từ những bài võ thuật, em dần cảm mến tính cách và tinh thần hoạt động cộng đồng của anh.",
  },
  {
    icon: Coffee,
    title: "Những cuộc trò chuyện",
    description: "Từ những buổi trò chuyện chỉ về võ thuật, dần dần chúng tôi chia sẻ nhiều hơn về cuộc sống. Tình cảm lớn dần mà không ai hay biết từ lúc nào.",
  },
  {
    icon: Users,
    title: "Từ đi chơi chung đến riêng",
    description: "Những buổi đi chơi chung với lớp võ, rồi đến những buổi hẹn riêng đầy ngại ngùng. Mỗi khoảnh khắc bên nhau đều đáng nhớ.",
  },
  {
    icon: Heart,
    title: "Yêu thương và giận hờn",
    description: "Hành trình đầy lãng mạn nhưng cũng có những lúc giận hờn. Đó là mùi vị của tình yêu - yêu thương thắm thiết và cùng nhau vượt qua.",
  },
  {
    icon: Plane,
    title: "Sự ủng hộ từ mọi người",
    description: "Chúng tôi may mắn nhận được sự ủng hộ của gia đình hai bên, lớp võ, người thân và bạn bè. Tình yêu thêm trọn vẹn với những lời chúc phúc.",
  },
  {
    icon: Home,
    title: "Về chung một nhà",
    description: "Khi trái chín quả, tình đã thắm - từ đầu cầu Nhật Bản, chúng tôi về Việt Nam làm đám cưới. Hải Phòng, Cam Ranh, Sài Gòn và tiệc tại Nhật cuối tháng 7.",
  },
]

export function LoveStory() {
  return (
    <section id="love-story" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-foreground mb-4">
            Chuyện Tình Yêu
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-primary/40" />
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <div className="h-px w-20 bg-primary/40" />
          </div>
          <p className="text-muted-foreground mt-4 text-lg">
            Hành trình từ lớp võ đến ngày về chung một nhà
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/20" />

          {storyTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <item.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
