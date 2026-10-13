import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const newBlog = {
  id: "blog-react-under-the-hood-virtual-dom-reconciliation",
  slug: "react-under-the-hood-virtual-dom-reconciliation",
  titleAr: "إيه اللي بيحصل جوه React من لحظة ما تغيّر قيمة الـ State لحد ما تشوف التغيير على الشاشة؟ 🤔",
  titleEn: "What Happens Inside React Under the Hood: From State Change to Screen Update",
  excerptAr: "في البوست ده هنتكلم عن الـ Virtual DOM، Rendering Phase، Reconciliation، Diffing Algorithm، وCommit Phase، وهنفهم العلاقة بينهم وإزاي React بتحدد التغييرات اللي محتاجة تحصل في الـ UI، باستخدام مثال عملي.",
  excerptEn: "A comprehensive deep dive into React internals: exploring Virtual DOM, Rendering Phase, Reconciliation, Diffing Algorithm, and Commit Phase with practical code examples and unnecessary re-render solutions.",
  coverImage: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_internals_cover.jpg",
  categoryAr: "رياكت وهندسة الواجهات",
  categoryEn: "React & Architecture",
  tags: [
    "ReactJS",
    "VirtualDOM",
    "Reconciliation",
    "DiffingAlgorithm",
    "RenderingPhase",
    "CommitPhase",
    "ReactMemo",
    "FrontendDevelopment",
    "JavaScript",
    "WebDevelopment",
    "Performance"
  ],
  authorName: "Mohamed H. Mowafy",
  authorRole: "Front-End Developer",
  readTimeAr: "6 دقائق قراءة",
  readTimeEn: "6 min read",
  publishedAt: "2026-10",
  likes: 12,
  contentAr: {
    intro: "في البوست ده هنتكلم عن الـ **Virtual DOM، Rendering Phase، Reconciliation، Diffing Algorithm، وCommit Phase**، وهنفهم العلاقة بينهم وإزاي React بتحدد التغييرات اللي محتاجة تحصل في الـ UI، باستخدام مثال عملي.",
    sections: [
      {
        heading: "1. مثال عملي وبناء الـ DOM Tree والـ Virtual DOM",
        body: "في البداية، المتصفح بيبني الـ **DOM Tree** اللي بتمثل عناصر الصفحة والعلاقة بينها. في مثالنا، عندنا `div` جواه `p` بتعرض قيمة `count`، وكمان الـ `Button` اللي المستخدم بيتفاعل معاه، ومكون `Products` اللي بيعرض المنتجات.\n\nلكن React كمان بتستخدم حاجة بنسميها **Virtual DOM**، وهي تمثيل في الذاكرة لشكل واجهة المستخدم الناتج من الـ Components. بدل ما تعتمد على تعديل الـ DOM الحقيقي مباشرةً كل ما البيانات تتغير، React بتحسب شكل الـ UI المطلوب، وبعدها بتحدد التغييرات اللازمة لتحديث الواجهة.\n\nخلينا نفترض إن قيمة `count` في البداية بتساوي `0`، فشكل الـ UI بيحتوي على النص `count is: 0`. بعد أول Render، React بتكون أنشأت عناصر الـ DOM المطلوبة لعرض الواجهة.",
        codeSnippet: `import { useState } from "react";
import Button from "../ui/Button";
import Products from "./Products";

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const products = [
        { id: 1, title: "Product 1", price: 100 },
        { id: 2, title: "Product 2", price: 200 },
        { id: 3, title: "Product 3", price: 300 },
    ];
    return (
        <div  className="flex flex-col items-center gap-4">
            <p className="text-2xl font-medium">count is: {count}</p>
            <Button fun={setCount} value={count} />
            <Products products={products} />
        </div>
    )
}
export default Counter;`
      },
      {
        heading: "2. إيه اللي بيحصل لما الـ State تتغير؟ (Triggering a Render & Rendering Phase)",
        body: "طيب، إيه اللي بيحصل لما نضغط على الزرار وتتغير قيمة `count` إلى `1`؟\n\nلما نستدعي `setCount`، React بتجدول تحديثًا للـ Component، وده بيبدأ عملية اسمها **Triggering a Render**. بعدها، خلال الـ **Rendering Phase**، React بتشغّل الـ `Counter` من جديد، وبتحسب شكل الـ UI بناءً على قيمة الـ State الجديدة.\n\nنتيجة الـ Render ده، React بتنتج **New Virtual DOM** بيمثّل شكل الـ UI بعد التحديث. يعني النص اللي كان `count is: 0` بقى المفروض يكون `count is: 1`.\n\nوهنا نقدر نفهم فكرة الـ **Old Virtual DOM** والـ **New Virtual DOM**: القديم بيمثل شكل الـ UI السابق، والجديد بيمثل الشكل الناتج عن الـ Render الحالي. React بتستخدم الاتنين عشان تحدد إيه اللي اتغير وإيه اللي محتاج يتحدّث في الـ DOM الحقيقي. ودي طريقة مبسطة لشرح الفكرة؛ مش شرط React تنشئ شجرتين كاملتين ومستقلتين من الصفر في كل تحديث.",
        image: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_reconciliation_flow.png",
        imageUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_reconciliation_flow.png",
        imageAlt: "مخطط مسار Reconciliation و Diffing Algorithm في React"
      },
      {
        heading: "3. عملية الـ Reconciliation وخوارزمية المقارنة Diffing Algorithm",
        body: "بعد ما React تحسب شكل الـ UI الجديد، بتبدأ عملية اسمها **Reconciliation**، وهي العملية الأوسع اللي بتحدد إزاي React تتعامل مع الشجرة الجديدة مقارنةً بالسابقة، وإيه العناصر اللي هتفضل موجودة، وإيه اللي محتاج يتحدّث أو يتضاف أو يتشال.\n\nوهنا بييجي دور **Diffing Algorithm**، اللي بتساعد React تقارن بين الشجرة السابقة والجديدة وتحدد الاختلافات بينهما وفق قواعد معينة.\n\nيعني الـ **Reconciliation** هي عملية تحديد كيفية التعامل مع تحديث شجرة الـ UI، أما الـ **Diffing** فهو آلية المقارنة اللي بتساعد في تحديد الاختلافات المطلوبة. الاتنين مرتبطين ببعض، لكن مش نفس المصطلح.\n\nنرجع لمثالنا: لما `count` تتغير من `0` إلى `1`، React بتحدد إن النص اتغير، بينما عناصر زي الـ `div` والـ `Button` ومكون `Products` لسه موجودة في الشجرة. وبناءً على نتيجة المقارنة وقواعد React، بتحدد التعديلات المطلوبة بدل ما تعيد إنشاء كل عناصر الـ UI في الـ DOM الحقيقي من البداية.",
        image: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_diffing_algorithm.png",
        imageUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_diffing_algorithm.png",
        imageAlt: "مقارنة الـ Old Virtual DOM والـ New Virtual DOM بواسطة خوارزمية Diffing"
      },
      {
        heading: "4. مشكلة الـ Unnecessary Re-renders ودور React.memo",
        body: "وهنا بقى فيه نقطة مهمة مرتبطة بمشكلة الـ Unnecessary Re-renders! 👀\n\nبما إن `Products` موجود جوه `Counter`، فلما قيمة `count` تتغير ويعمل `Counter` Re-render، فـ `Products` هيعمل Re-render هو كمان بشكل افتراضي، حتى لو بيانات المنتجات نفسها متغيرتش!\n\nوده لأن React بشكل افتراضي بتعيد تشغيل الـ Child Components لما الـ Parent يعمل Re-render، ما لم يكن فيه سبب يمنع ده، زي استخدام `React.memo` بالشكل المناسب.\n\nلكن خد بالك: إن `Products` عمل Re-render مش معناه بالضرورة إن الـ DOM الحقيقي الخاص بيه هيتغير؛ React لسه بتحدد التغييرات المطلوبة، وممكن تلاقي إن مفيش أي تعديل مطلوب في الـ DOM الخاص بالمنتجات.\n\nولو `Products` مكون مكلف في الـ Rendering، ممكن نفكر في استخدام `React.memo` لتجنب إعادة تشغيله لما الـ Props بتاعته متتغيرش، مع مراعاة إن فيه عوامل تانية ممكن تسبب له تحديثًا، زي تغيّر الـ State الداخلية أو الـ Context اللي بيستخدمه."
      },
      {
        heading: "5. مرحلة الـ Commit Phase والرسم على الشاشة (Browser Painting)",
        body: "بعد ما React تحدد التغييرات المطلوبة، بنوصل إلى **Commit Phase**، وهي المرحلة اللي بتطبّق فيها التعديلات الفعلية على الـ DOM الحقيقي. في مثالنا، النص بيتحدّث من `count is: 0` إلى `count is: 1`، بينما عناصر المنتجات مش لازم يحصل فيها أي تغيير في الـ DOM لو ناتجها فضل زي ما هو.\n\nبعدها المتصفح بيعرض النتيجة على الشاشة من خلال مراحل الرسم الخاصة بيه، واللي بنشير ليها عادةً باسم **Browser Painting**.\n\nوبكده نقدر نربط الرحلة كلها: تحديث الـ State بيبدأ الـ Render، وReact بتحسب شكل الـ UI الجديد، وبعدها الـ Reconciliation بتحدد كيفية التعامل مع الشجرة، والـ Diffing بيساعد في مقارنة القديم بالجديد، ثم التغييرات المطلوبة بتتطبّق في الـ Commit Phase لحد ما المستخدم يشوف النتيجة."
      }
    ],
    conclusion: "**سؤال للنقاش:** هل لاحظت إن `Products` بيعمل Re-render كل ما قيمة `count` تتغير في `Counter`، رغم إننا مش بنغيّر أي حاجة في `Products` نفسها؟ إزاي نقدر نحل المشكلة دي ونتجنب الـ Re-renders غير الضرورية؟ 🤔"
  },
  contentEn: {
    intro: "In this article, we dive deep into the inner workings of React: Virtual DOM, Rendering Phase, Reconciliation, Diffing Algorithm, and Commit Phase. We'll understand how they relate to each other and how React determines UI updates using a practical counter example.",
    sections: [
      {
        heading: "1. Practical Example: Building DOM Tree & Virtual DOM",
        body: "At first, the browser parses elements and constructs the DOM Tree representing UI hierarchy. In our example, we have a div containing a p displaying count, a Button user interaction trigger, and a Products list component.\n\nReact introduces the Virtual DOM—a lightweight, in-memory representation of UI produced by components. Instead of touching the real DOM on every state update, React computes the intended UI state in memory first.\n\nAssuming count starts at 0, the UI renders count is: 0. Following initial render, React synchronizes and produces the required real DOM tree nodes.",
        codeSnippet: `import { useState } from "react";
import Button from "../ui/Button";
import Products from "./Products";

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const products = [
        { id: 1, title: "Product 1", price: 100 },
        { id: 2, title: "Product 2", price: 200 },
        { id: 3, title: "Product 3", price: 300 },
    ];
    return (
        <div  className="flex flex-col items-center gap-4">
            <p className="text-2xl font-medium">count is: {count}</p>
            <Button fun={setCount} value={count} />
            <Products products={products} />
        </div>
    )
}
export default Counter;`
      },
      {
        heading: "2. State Update: Triggering a Render & Rendering Phase",
        body: "What happens when we click the button and count increments from 0 to 1?\n\nCalling setCount schedules an update, initiating Triggering a Render. During the Rendering Phase, React re-invokes the Counter component to calculate the new UI based on the updated state.\n\nThis yields a New Virtual DOM where count is: 1. Comparing Old Virtual DOM vs New Virtual DOM enables React to compute minimal changes rather than re-creating the entire DOM from scratch.",
        image: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_reconciliation_flow.png",
        imageUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_reconciliation_flow.png",
        imageAlt: "React Reconciliation and Diffing Phase Diagram"
      },
      {
        heading: "3. Reconciliation & The Diffing Algorithm",
        body: "After calculating the new UI shape, React enters Reconciliation—the overarching process determining how to manage the new virtual tree against previous one.\n\nHere comes the Diffing Algorithm: the heuristic mechanism comparing old and new trees. Reconciliation is the update strategy, while Diffing is the comparison engine.\n\nIn our counter, React notices only the text node inside p changed, leaving div, Button, and Products mounted in place.",
        image: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_diffing_algorithm.png",
        imageUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/react_diffing_algorithm.png",
        imageAlt: "Diffing Algorithm Virtual DOM Old vs New Diagram"
      },
      {
        heading: "4. Unnecessary Re-renders & The Role of React.memo",
        body: "Here is a crucial insight regarding Unnecessary Re-renders! 👀\n\nBecause Products is nested inside Counter, whenever count changes and Counter re-renders, Products re-renders by default too—even if its product data never changed!\n\nReact re-executes children when a parent re-renders unless explicitly prevented (e.g., using React.memo correctly).\n\nKeep in mind: Products re-rendering doesn't necessarily mean its real DOM changes if React diffs identical output, but skipping execution for expensive components with React.memo saves valuable render cycles.",
      },
      {
        heading: "5. Commit Phase & Browser Painting",
        body: "Once mutations are planned, React transitions to the Commit Phase—applying real DOM changes. In our example, only the text updates to count is: 1, leaving products untouched.\n\nThe browser then reflects these changes via Browser Painting, completing the update cycle smoothly.",
      }
    ],
    conclusion: "**Discussion Question:** Have you noticed that Products re-renders every time count changes in Counter, even though we haven't touched anything in Products? How can we resolve this and prevent unnecessary re-renders? 🤔"
  }
};

async function run() {
  console.log("Upserting to Supabase...");
  const payload = {
    ...newBlog,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('Blog').upsert(payload);
  if (error) {
    console.error("Supabase upsert error:", error);
  } else {
    console.log("Supabase upsert success!");
  }

  // Also sync to portfolio-data.json
  const dataFilePath = path.join(__dirname, '../portfolio-data.json');
  const store = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  if (!store.blogs) store.blogs = [];

  const existingIdx = store.blogs.findIndex((b) => b.id === newBlog.id || b.slug === newBlog.slug);
  const formattedForLocal = {
    ...newBlog,
    author: {
      name: newBlog.authorName,
      roleEn: newBlog.authorRole,
      roleAr: "مطور واجهات أمامية",
      avatar: "/avatar.png"
    }
  };

  if (existingIdx >= 0) {
    store.blogs[existingIdx] = formattedForLocal;
  } else {
    store.blogs.unshift(formattedForLocal);
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(store, null, 2), 'utf8');
  console.log("Local portfolio-data.json updated successfully! Total blogs:", store.blogs.length);
}

run().catch(console.error);
