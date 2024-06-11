const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var uniqueValidator = require("mongoose-unique-validator");

const { encrypt, decrypt } = require("../config/crypto");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
      get: (value) => value && decrypt(value),
      set: (value) => value && encrypt(value.toLowerCase()),
      validate: {
        validator: async function (value) {
          if (typeof value === "undefined") return true; // Allow undefined
          if (value === "") return true; // Allow empty string
          if (value === null) return true; // Allow null
          // Check for uniqueness, avoid actual user document
          const count = await this.model("User").countDocuments({
            email: value,
            _id: { $ne: this._id },
          });

          return count === 0;
        },
        message: "Email already exists",
      },
    },
    username: {
      type: String,
      default: undefined, // Set to undefined instead of null
      validate: {
        validator: async function (value) {
          if (typeof value === "undefined") return true; // Allow undefined
          // Check for uniqueness, avoid actual user document
          const count = await this.model("User").countDocuments({
            username: value,
            _id: { $ne: this._id },
          });

          return count === 0;
        },
        message: "Username already exists",
      },
    },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    role: { type: String }, //groupOwner
    assets: [
      {
        asset: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Asset",
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    telegram_id: {
      type: Number,
      required: false,
    },
    telegram_otp: {
      type: String,
      required: false,
    },
    gravatar: {
      type: String,
      required: false,
    },
    token_balance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 1000,
    },
    emailToken: {
      type: String,
      required: false,
      unique: true,
    },
    google_auth: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false, // Update on production
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    terms_accepted: {
      type: Boolean,
      default: false,
    },
    newsletter_accepted: {
      type: Boolean,
      default: false,
    },
    notifications_accepted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      default: "es",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    key_2fa: {
      type: String,
      required: false,
    },
    performance: {
      daily: {
        type: Number,
        default: 0,
      },
      weekly: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
      yearly: {
        type: Number,
        default: 0,
      },
      all: {
        type: Number,
        default: 0,
      },
    },
    performance_solana: {
      daily: {
        type: Number,
        default: 0,
      },
      weekly: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
      yearly: {
        type: Number,
        default: 0,
      },
      all: {
        type: Number,
        default: 0,
      },
    },
    solana_wallet: {
      type: String,
      required: false,
    },
    solana_assets: [
      {
        asset: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Asset",
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    referrer: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      firstInvestment: {
        type: Boolean,
        default: false,
      },
    },
    totalBalance: {
      type: Number,
      default: 1000,
    },
    solanaBalance: {
      type: Number,
      default: 0,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    linkEmailTlg: {
      emailOTP: {
        type: Number,
        required: false,
      },
      emailTokenTlg: {
        type: String,
        required: false,
      },
      emailTemp: {
        type: String,
        required: false,
      },
      emailConfirmed: {
        type: Boolean,
        default: false,
      },
      telegramConfirmed: {
        type: Boolean,
        default: false,
      },
      emailAttempts: {
        type: Number,
        default: 0,
      },
    },
    linkTelegramAccount: {
      telegramOTP: {
        type: Number,
        required: false,
      },
      telegramConfirmed: {
        type: Boolean,
        default: false,
      },
      username: {
        type: String,
        required: false,
      },
    },
    reward_balance: {
      available_usd: {
        type: Number,
        default: 0,
      },
      withdrawn_usd: {
        type: Number,
        default: 0,
      },
    },
  },

  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.plugin(uniqueValidator);

userSchema.methods.isValidPassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

// Excluir auth_secret al obtener datos de usuario desde la base de datos
userSchema.query.toJSON = function () {
  return this.select("-auth_secret");
};

// Excluir auth_secret al convertir un usuario a JSON
userSchema.methods.toJSON = function () {
  return { ...this.toObject(), auth_secret: undefined };
};

userSchema.index({ username: 1 }, { unique: true, sparse: true });

userSchema.pre("save", async function (next) {
  if (this.username) {
    this.username = this.username.trim().toLowerCase();
  }

  if (
    this.isModified("assets") ||
    this.isModified("balance") ||
    this.isModified("token_balance")
  ) {
    const user = await User.findById(this._id).populate(
      "assets.asset solana_assets.asset"
    );
    //console.log("User coming from", user.totalBalance);

    const assetBalance = user.assets.reduce((acc, asset) => {
      return acc + asset.amount * asset.asset.current_price;
    }, 0);

    const solanaBalance = user.solana_assets.reduce((acc, asset) => {
      return acc + asset.amount * asset.asset.current_price;
    }, 0);

    user.totalBalance = user.balance + assetBalance;
    user.solanaBalance = solanaBalance;
    user.totalPoints =
      (user.totalBalance > 1000 ? user.totalBalance - 1000 : 0) +
      (user.solanaBalance > 1000 ? user.solanaBalance - 1000 : 0) +
      (user.token_balance || 0);

    //console.log("User to", user.totalBalance);
    await user.save();
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
