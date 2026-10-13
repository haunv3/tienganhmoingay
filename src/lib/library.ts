import type { LearningLevel } from "./types";
export interface ReferenceEntry { topics?: string[]; context?: string; levels?: LearningLevel[]; level?: LearningLevel | "extension"; id: string; title: string; description: string; formula?: string; en?: string; vi?: string; tip?: string; topic?: string; }
export const CATEGORIES = [
  { slug: "ipa", title: "Bảng phát âm IPA", icon: "◌", desc: "44 âm theo hệ phiên âm Anh-Anh, kèm từ ví dụ." },
  { slug: "cac-thi", title: "Các thì", icon: "◷", desc: "Công thức, cách dùng và ví dụ của 12 thì thường học." },
  { slug: "cau-truc", title: "Cấu trúc câu", icon: "↔", desc: "Những khung câu cơ bản để tự ghép ý." },
  { slug: "cum-tu", title: "Cụm từ & mẫu câu", icon: "❞", desc: "Chọn tình huống, học cụm từ và thay từ để tự nói." },
  { slug: "tu-vung", title: "Từ vựng", icon: "Aa", desc: "Từ vựng theo chủ đề, kèm phiên âm và ví dụ sử dụng." },
  { slug: "chu-de", title: "Câu nói theo chủ đề", icon: "☏", desc: "Những câu có thể dùng ngay trong tình huống hằng ngày." },
];
const vowels = [
 ["iː","see","Nhích lưỡi lên cao, môi hơi kéo sang hai bên."],["ɪ","sit","Lưỡi và môi thả lỏng hơn /iː/."],["e","bed","Mở miệng vừa, lưỡi ở phía trước."],["æ","cat","Hạ hàm rộng hơn /e/, giữ lưỡi phía trước."],["ɑː","car","Mở miệng rộng, lưỡi thấp và lùi về sau."],["ɒ","hot","Môi tròn, miệng mở; âm Anh-Anh."],["ɔː","law","Tròn môi, lưỡi lùi về sau."],["ʊ","book","Môi tròn nhẹ, thả lỏng hơn /uː/."],["uː","food","Tròn môi, nâng phần sau lưỡi."],["ʌ","cup","Miệng mở vừa, môi không tròn."],["ɜː","bird","Lưỡi ở giữa, môi thả lỏng; ví dụ theo Anh-Anh."],["ə","about","Âm nhẹ, ngắn, thường nằm ở âm tiết không nhấn."],
];
const diphthongs = [["eɪ","day"],["aɪ","my"],["ɔɪ","boy"],["əʊ","go"],["aʊ","now"],["ɪə","near"],["eə","hair"],["ʊə","tour"]];
const consonants = [["p","pen"],["b","bag"],["t","tea"],["d","door"],["k","key"],["ɡ","go"],["f","fan"],["v","van"],["θ","think"],["ð","this"],["s","sun"],["z","zoo"],["ʃ","shop"],["ʒ","vision"],["h","hat"],["tʃ","chair"],["dʒ","job"],["m","map"],["n","name"],["ŋ","sing"],["l","light"],["r","red"],["j","yes"],["w","we"]];
export const IPA: ReferenceEntry[] = [
 ...vowels.map(([sound, en, tip]) => ({id:`ipa-${sound}`, level:"foundation" as const,title:`/${sound}/`, description:"Nguyên âm đơn", topic:"Nguyên âm đơn", en, tip})),
 ...diphthongs.map(([sound,en]) => ({id:`ipa-${sound}`,level:"foundation" as const,title:`/${sound}/`,description:"Chuyển từ vị trí âm đầu sang âm sau trong một âm tiết.",topic:"Nguyên âm đôi",en,tip:"Nghe từ ví dụ và chú ý chuyển động của môi, lưỡi. Một số âm thay đổi theo giọng nói."})),
 ...consonants.map(([sound,en]) => ({id:`ipa-${sound}`,level:"foundation" as const,title:`/${sound}/`,description:"Phụ âm",topic:"Phụ âm",en,tip: sound === "θ" || sound === "ð" ? "Đặt đầu lưỡi nhẹ giữa hai hàm răng, đẩy hơi ra. /ð/ có rung dây thanh, /θ/ không rung." : "Nghe từ ví dụ; nút nghe đọc cả từ, không đọc ký hiệu IPA riêng lẻ."})),
];
const tenseRows = [
 ["Hiện tại đơn","S + V(s/es)","Thói quen, sự thật và lịch trình.","I walk to work every day.","Tôi đi bộ đi làm mỗi ngày.","Với to be dùng am/is/are. Động từ thường phủ định bằng do/does not + V."],
 ["Hiện tại tiếp diễn","S + am/is/are + V-ing","Việc đang diễn ra hoặc tình huống tạm thời.","She is reading now.","Cô ấy đang đọc sách.","Không phải mọi động từ đều dùng tự nhiên ở dạng tiếp diễn; know thường dùng ở hiện tại đơn."],
 ["Hiện tại hoàn thành","S + have/has + V3","Việc trước hiện tại có liên hệ với hiện tại.","I have lost my key.","Tôi đã làm mất chìa khóa.","Thường không dùng với thời điểm quá khứ đã kết thúc như yesterday."],
 ["Hiện tại hoàn thành tiếp diễn","S + have/has been + V-ing","Nhấn mạnh quá trình kéo dài đến hiện tại hoặc vừa kết thúc.","I have been studying for an hour.","Tôi đã học được một giờ.","For chỉ khoảng thời gian; since chỉ mốc bắt đầu."],
 ["Quá khứ đơn","S + V2/ed","Việc đã xảy ra và kết thúc trong quá khứ.","We visited Hue last year.","Chúng tôi đã đến Huế năm ngoái.","Phủ định và câu hỏi dùng did + động từ nguyên mẫu; to be dùng was/were."],
 ["Quá khứ tiếp diễn","S + was/were + V-ing","Việc đang diễn ra tại một thời điểm quá khứ.","I was cooking at six.","Tôi đang nấu ăn lúc sáu giờ.","Có thể làm nền cho một hành động xen vào ở quá khứ đơn."],
 ["Quá khứ hoàn thành","S + had + V3","Việc xảy ra trước một mốc hoặc sự việc khác trong quá khứ.","She had left before I arrived.","Cô ấy đã rời đi trước khi tôi đến.","Cần ngữ cảnh quá khứ, không dùng chỉ vì một việc xảy ra từ lâu."],
 ["Quá khứ hoàn thành tiếp diễn","S + had been + V-ing","Quá trình kéo dài trước một mốc quá khứ.","He had been working for hours when I called.","Anh ấy đã làm việc nhiều giờ khi tôi gọi.","Nhấn mạnh thời lượng hoặc quá trình."],
 ["Tương lai đơn","S + will + V","Dự đoán, lời hứa hoặc quyết định tại lúc nói.","I will call you tonight.","Tôi sẽ gọi bạn tối nay.","Will không đổi theo chủ ngữ; phủ định là will not hoặc won’t."],
 ["Tương lai tiếp diễn","S + will be + V-ing","Việc sẽ đang diễn ra tại một thời điểm tương lai.","I will be working at nine tomorrow.","Tôi sẽ đang làm việc lúc chín giờ ngày mai.","Chọn một mốc tương lai để làm rõ ngữ cảnh."],
 ["Tương lai hoàn thành","S + will have + V3","Việc sẽ hoàn tất trước một mốc tương lai.","We will have finished by Friday.","Chúng tôi sẽ hoàn thành trước hoặc vào thứ Sáu.","By chỉ hạn chót, không đồng nghĩa với until."],
 ["Tương lai hoàn thành tiếp diễn","S + will have been + V-ing","Thời lượng của quá trình đến một mốc tương lai.","By June, I will have been working here for a year.","Đến tháng Sáu, tôi sẽ làm việc ở đây được một năm.","Dùng khi muốn nhấn mạnh quá trình và khoảng thời gian."],
];
export const TENSES: ReferenceEntry[] = tenseRows.map(([title,formula,description,en,vi,tip],i)=>({id:`tense-${i}`,title,formula,description,en,vi,tip,level: (["A1","A1","A2","B2","A2","A2","B1","B2","A2","B1","B2","extension"] as const)[i]}));
const structures = [
 ["To be: khẳng định","S + am/is/are + bổ ngữ","Giới thiệu, mô tả hoặc nói vị trí.","I am ready.","Tôi đã sẵn sàng."],
 ["To be: phủ định","S + am/is/are + not + bổ ngữ","Đặt not ngay sau to be.","She is not tired.","Cô ấy không mệt."],
 ["Câu hỏi với to be","Am/Is/Are + S + bổ ngữ?","Đảo to be lên trước chủ ngữ.","Are you at home?","Bạn ở nhà phải không?"],
 ["Câu hỏi với động từ thường","Do/Does + S + V?","Dùng động từ nguyên mẫu sau chủ ngữ.","Do you like tea?","Bạn thích trà không?"],
 ["There is / There are","There is + danh từ số ít; There are + danh từ số nhiều","Nói có thứ gì ở đâu.","There is a park near my house.","Có một công viên gần nhà tôi."],
 ["Muốn làm gì","S + want to + V","Nói về mong muốn.","I want to learn English.","Tôi muốn học tiếng Anh."],
 ["Có thể làm gì","S + can + V","Nói khả năng; can đi với động từ nguyên mẫu.","I can cook.","Tôi có thể nấu ăn."],
 ["Điều kiện loại 1","If + hiện tại đơn, S + will + V","Khả năng có thể xảy ra trong tương lai.","If it rains, I will stay home.","Nếu trời mưa, tôi sẽ ở nhà."],
];
export const STRUCTURES: ReferenceEntry[] = structures.map(([title,formula,description,en,vi],i)=>({id:`structure-${i}`,title,formula,description,en,vi,level: i===7 ? "A2" as const : "A1" as const}));
const phrases = [
 ["a little","một chút","I speak a little English.","Tôi nói được một chút tiếng Anh."],
 ["on the way","trên đường","I am on the way.","Tôi đang trên đường."],
 ["take a break","nghỉ một lát","Let's take a break.","Chúng ta nghỉ một lát nhé."],
 ["look for","tìm kiếm","I am looking for my phone.","Tôi đang tìm điện thoại."],
 ["Would you like…?","Bạn có muốn…?","Would you like some tea?","Bạn có muốn uống chút trà không?"],
 ["Could you…?","Bạn có thể…? (yêu cầu lịch sự)","Could you speak slowly?","Bạn có thể nói chậm không?"],
];
export const PHRASES: ReferenceEntry[] = phrases.map(([title,description,en,vi],i)=>({id:`phrase-${i}`,title,description,en,vi,level:"A1" as const}));
const topicRows = [
 ["Làm quen","My name is Linh.","Tên tôi là Linh."],["Làm quen","Nice to meet you.","Rất vui được gặp bạn."],["Làm quen","Where are you from?","Bạn đến từ đâu?"],
 ["Ăn uống","Could I have the menu, please?","Cho tôi xem thực đơn được không?"],["Ăn uống","I would like a bowl of soup.","Tôi muốn một bát súp."],["Ăn uống","Could we have the bill, please?","Cho chúng tôi xin hóa đơn nhé."],
 ["Mua sắm","How much is this?","Cái này giá bao nhiêu?"],["Mua sắm","Do you have a smaller size?","Bạn có cỡ nhỏ hơn không?"],["Mua sắm","I am just looking, thank you.","Tôi chỉ xem thôi, cảm ơn."],
 ["Đi lại","Where is the nearest bus stop?","Trạm xe buýt gần nhất ở đâu?"],["Đi lại","Does this bus go to the station?","Xe buýt này có đến nhà ga không?"],["Đi lại","I would like a ticket to Hue.","Tôi muốn mua một vé đi Huế."],
 ["Công việc","What do you do?","Bạn làm nghề gì?"],["Công việc","I work as a designer.","Tôi làm nhà thiết kế."],["Công việc","Could you send me an email?","Bạn gửi email cho tôi được không?"],
 ["Nhờ giúp đỡ","Could you say that again?","Bạn nói lại được không?"],["Nhờ giúp đỡ","I do not understand yet.","Tôi vẫn chưa hiểu."],["Nhờ giúp đỡ","Could you help me, please?","Bạn giúp tôi được không?"],
];
export const TOPICS: ReferenceEntry[] = topicRows.map(([topic,en,vi],i)=>({id:`topic-${i}`,title:en,description:vi,topic,en,vi,level:topic==="Công việc"?"A2" as const:"A1" as const}));

STRUCTURES.push(
 {id:"structure-b1-condition",level:"B1",title:"Giả định hiện tại",description:"Nói tình huống ít khả năng hoặc khác thực tế.",formula:"If + V2, would + V",en:"If I had more time, I would travel.",vi:"Nếu có thêm thời gian, tôi sẽ đi du lịch."},
 {id:"structure-b1-passive",level:"B1",title:"Bị động cơ bản",description:"Tập trung vào người/vật nhận hành động.",formula:"S + be + V3",en:"Orders are processed every morning.",vi:"Đơn được xử lý mỗi sáng."},
 {id:"structure-b1-reported",level:"B1",title:"Tường thuật lời nói",description:"Đổi đại từ và mốc thời gian theo góc nhìn người kể.",formula:"She said that … / She told me that …",en:"Mai told me that she was busy.",vi:"Mai nói với tôi rằng cô ấy bận."},
 {id:"structure-b2-deduction",level:"B2",title:"Suy luận về quá khứ",description:"Thể hiện mức chắc chắn, không tự biến giả định thành bằng chứng.",formula:"must/might/can’t have + V3",en:"He might have missed the train.",vi:"Anh ấy có thể đã lỡ tàu."},
 {id:"structure-b2-concession",level:"B2",title:"Nhượng bộ và đối lập",description:"Although đi với mệnh đề; despite đi với danh từ/V-ing.",formula:"Although + S + V / Despite + noun/V-ing",en:"Despite the delay, the meeting was useful.",vi:"Mặc dù trễ, cuộc họp hữu ích."}
);
PHRASES.push(
 {id:"phrase-b1-opinion",level:"B1",title:"In my view",description:"Theo quan điểm của tôi",en:"In my view, the library should open later.",vi:"Theo tôi, thư viện nên mở muộn hơn."},
 {id:"phrase-b2-qualification",level:"B2",title:"This may depend on…",description:"Điều này có thể phụ thuộc vào…",en:"This may depend on how supportive the team is.",vi:"Điều này có thể tùy mức hỗ trợ của nhóm."},
 {id:"phrase-b2-proposal",level:"B2",title:"Would it be possible to…?",description:"Có thể… được không?",en:"Would it be possible to extend the deadline?",vi:"Có thể gia hạn thời hạn không?"}
);
TOPICS.push(
 {id:"topic-b1-work",level:"B1",topic:"Công việc",title:"I suggest starting with the summary.",description:"Tôi đề xuất bắt đầu bằng bản tóm tắt.",en:"I suggest starting with the summary.",vi:"Tôi đề xuất bắt đầu bằng bản tóm tắt."},
 {id:"topic-b2-work",level:"B2",topic:"Công việc",title:"Could we agree on the priority sections?",description:"Chúng ta thống nhất các phần ưu tiên được không?",en:"Could we agree on the priority sections?",vi:"Chúng ta thống nhất các phần ưu tiên được không?"}
);
