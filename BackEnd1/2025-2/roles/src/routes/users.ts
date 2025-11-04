import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";
import { allUsers, Role } from "../models/userStore";

const router = Router();

router.get("/me", authenticate, (req, res) => {
    res.json({ user: (req as any).user });
});

router.get("/editor-area/:id", authenticate, requireRole(["editor", "admin"]), (req, res) => {
    // Role.
    // const post = PostData.getPostById(id);
    // if(post.author != user.id){
    //     throw new Error("Usuário não é o autor do post");
    // }
    res.send("Fim =)")
});

router.get("/admin/users", authenticate, requireRole("admin"), (req, res) => {
    res.json({ users: allUsers() });
});

export default router;